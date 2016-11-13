define('tempo30/app/antrag', [
    'jquery',
    'tempo30/model/version',
    'tempo30/view/ortssuche_dialog',
    'tempo30/view/position_dialog',
    'tempo30/view/result_dialog',
    'tempo30/view/fehler_melden_dialog',
    'tempo30/view/fehler_aufgetaucht_dialog',
    'tempo30/view/download_dialog',
    'tempo30/app/create-word',
    'tempo30/view/wie_geht_es_weiter_dialog',
    'tempo30/view/bmu_daten_anfrage',
    'tempo30/view/polizeireview_ermitteln_fehler_dialog',
    'gettext!tempo30'
    //
], function ($, version, step1dialog, step2dialog, step3dialog, errorDialog, errorOccDialog, step4dialog, createWord, step5dialog, bmuDatenAnfrage, polizeiRvErr, gt) {

    function nominatimSearch(str, nr) {
	var baseUrl='https://nominatim.openstreetmap.org/search';
	var baseParam='?format=json&city=Hamburg&countrycodes=de&limit=1&accept-language=de&email=adfc-2016@sven.anders.hamburg';
	var query=nr+" "+str;
	var url= baseUrl + baseParam + '&street='+encodeURIComponent(query);
	return $.ajax({
	    'url': url,
	    'dataType':'json'
	});
    }

    function isEmpty(obj) {
	for (var key in obj) {
            if (hasOwnProperty.call(obj, key)) return false;
	}
	return true;
    }
      
    function getBrowser() { 
	if((navigator.userAgent.indexOf("Opera") || navigator.userAgent.indexOf('OPR')) != -1 ) 
	{
            return 'Opera';
	} 
	else if(navigator.userAgent.indexOf("Chromium") !== -1 )
	{
            return 'Chromium';
	}
	else if(navigator.userAgent.indexOf("Chrome") !== -1 )
	{
            return 'Chrome';
	}
	else if(navigator.userAgent.indexOf("Safari") !== -1)
	{
            return 'Safari';
	}
	else if(navigator.userAgent.indexOf("Firefox") !== -1 ) 
	{
            return 'Firefox';
	}
	else if((navigator.userAgent.indexOf("MSIE") !== -1 ) || (document.documentMode === true )) //IF IE > 10
	{
	    return 'IE'; 
	}  
	else 
	{
	    return 'unknown';
	}
    }
    function start() {
	var browser= getBrowser();

	if (browser === 'Safari') {
	    alert(gt('Es gibt ein Problem mit dem Safari Browser. Bitte benutzen Sie Chrome oder Firefox.'));

	} else if ((browser !== 'Chrome') && (browser !== 'Firefox')) {
	    alert(gt('Ihr Browser wird evtl. nicht unterstützt. Sicher getestet sind: Firefox, Chrome und Chromium. Testen Sie gerne die Anwendung und geben Sie uns Rückmeldung ob es funktioniert hat. Insbesondere der Download des Word-Dokuments kann evtl. fehlschlagen.'));

	    step1();
	} else {
	    step1();
	}
    }
    function step1() {
	step1dialog(step2, errorDialog).open();
    }
    
    function step2(data) {
	console.log(data);
	nominatimSearch(data.str, data.hausnr).done(function (d) {
	    console.log(d);
	    data.lat=d[0].lat;
	    data.lon=d[0].lon;
	    step2dialog(data, step1, step3, errorDialog).open();
	}).fail(function (e) {
            errorOccDialog('Fehler bei der Suche mit Nominatim', JSON.stringify(e)+JSON.stringify(data)).open();
	});
    }

    function step3(data) {
	var dialog=step3dialog(data, step2, step4, errorDialog);
	dialog.open();
	$.ajax({
	    'url': 'https://tools.adfc-hamburg.de/tempo30-backend/master/geodaten.php?lat='+data.lat+'&lon='+data.lon,
	    'dataType':'json'
	}).done( function (geodata) {
	    data=$.extend(data,geodata);
            if ((data.polizei===false) ||
                (data.polizei.length===0) ||
                (data.polizei[0].name === undefined) ||
                (data.polizei[0].strasse === undefined) ||
                (data.polizei[0].plz === undefined))
            {

                data.polizei=[{name: gt('POLIZEIREVIER'),
                               strasse: gt('POLIZEI-STRASSE'),
                               plz:'2xxx'
                              }];
                polizeiRvErr(data, errorDialog).open();
            } 
	    dialog.setGeoData(data);
	}).fail(function (e) {
            dialog.close();
            errorOccDialog(gt('Fehler bei der Geodatensuche an tools'), JSON.stringify(e)+JSON.stringify(data)).open();
	});
    }
    function step4(data) {
	var dlg=function (data) {
	    step4dialog(data, step3, step5, errorDialog).open();
	};
	if (
	    ((data.laerm_nacht.length===0) && (data.laerm_tag.length===0)) ||
                (data.luftdaten===false)  ||
	        (data.luftdaten.length===0) 
	   ) {
	    
	    bmuDatenAnfrage(data, dlg, errorDialog).open();
	} else {
	    dlg(data);
	}

    }
    function step5(data) {
	console.log(data);
	createWord.download(data);
	var sendToAdfc={};

	if (data.adfc_mail_contact || data.adfc_all) {
	    sendToAdfc.email = data.email;
	    sendToAdfc.bezirk = data.ort[0].bezirk_name;
	}

	if (data.adfc_anschrift || data.adfc_all) {
	    sendToAdfc.antrag_strasse = data.antrag_str;
	    sendToAdfc.hausnr = data.hausnr;
	    sendToAdfc.strasse = data.str;
	    sendToAdfc.plz = data.plz;
	    sendToAdfc.name = data.name;
	    sendToAdfc.bezirk = data.ort[0].bezirk_name;
	}

	if (data.adfc_map || data.adfc_all) {
	    sendToAdfc.lat = data.lat;
	    sendToAdfc.lon = data.lon;
	}

	if (isEmpty(sendToAdfc) === false) {
	    sendToAdfc.newsletter = data.newsletter;
	    sendToAdfc.saveAnschrift = data.adfc_anschrift;
	    sendToAdfc.showInMap = data.adfc_map;
	    sendToAdfc.noLimit = data.adfc_all;
	    $.post('https://tools.adfc-hamburg.de/tempo30-backend/master/save.php', sendToAdfc).fail(function (e) {
		errorOccDialog('Fehler bei der Datenübertragung an tools', JSON.stringify(e)+JSON.stringify(data)).open();

	    });
	}

	step5dialog(data, step4, step6, errorDialog).open();
    }
    function step6( data) {
        // do nothing
    }
    return start;

});

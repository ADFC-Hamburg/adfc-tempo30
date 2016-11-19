define('tempo30/view/result_dialog', [
    'jquery',
    'bootstrap',
    'bootstrap-dialog',
    'gettext!tempo30', 
    'tempo30/model/grenzwerte',
], function ($, bootstrap, BootstrapDialog, gt, grenzwerte) {

    'use strict';

    var laermTag;
    var laermNacht;
    var no2;
    var pm10;
    var pm25;


    function getLaermResult(value, dataStruct) {
	var result='undef';
	try {
	    result=value[0].klasse;
	}
	catch (e) {
	    // do nothing
	}
	return {
	    val_short:'Klasse: '+result,
	    img:dataStruct[result][0], 
	    val_long:dataStruct[result][1], 
	    description: dataStruct[result][2], 
	};
    }
    function getLuftResult(value, attr, dataStruct) {
	var val='undef';
	if (value !== false) {
	    try {
		val=value[0][attr];
	    }
	    catch (e) {
		// do nothing;
	    }
	} 
	var grenzwert='undef';
	var dist='';
	if (val!=='undef') {
	    dist='Ein Messergebniss '+Number(value[0].st_distance).toFixed(1)+' m von ihrem Haus entfernt zeigt: ';
	    grenzwert=0;
	    $.each(dataStruct, function (k,v) {
		if (k !== 'undef') {
		    if ((k<=val) && (grenzwert <k)) {
			grenzwert=k;
		    }
		}
	    });
	}
	return {
	    val_short: val,
	    img: dataStruct[grenzwert][0], 
	    val_long: dataStruct[grenzwert][1], 
	    description: dist + dataStruct[grenzwert][2], 
	};
    }
    function getDialog(data, backCb, nextCb, errorDialog) {
	var buttons=[
              {
                id: 'btn-err',
	        cssClass: 'btn-link adfc-antrag-btn-err',
                label: gt('Fehler/Problem melden'),
                action: function (dialogRef) {
                    errorDialog('Problem mit dem Tempo30 Antrag 3', '(Schritt 3:'+JSON.stringify(data)+')').open();
                }
            },
	    {
		id: 'back-btn',
		label: gt('zurück'),
		title: gt('zu Schritt 2'),
		action: function (dialogRef) {
		    dialogRef.close();
		    backCb(data);
		}
	    },
	    {
		id: 'close',
		label: gt('beenden'),
		title: gt('Beenden'),
		action: function (dialogRef) {
		    dialogRef.close();
		}
	    },
	    {
		id: 'next-btn',
		label: gt('Antrag vorbereiten'),
		cssClass: 'btn-disabled',
		title: gt('Zeigt den Antragstext in einem neuen Fenster'),
		action: function (dialogRef) {
		    dialogRef.close();
		    data.umweltdaten={
			laerm_tag: laermTag,
			laerm_nacht: laermNacht,
			no2: no2,
			pm10: pm10,
			pm25: pm25,
		    };
		    nextCb(data);
		}
	    }];
	
	var dialog = new BootstrapDialog({
            'title': gt('Tempo 30 beantragen, Schritt 3: Ergebnisse'),
            'message': gt('Bitte warten, wir prüfen die Grenzwerte....'),
            'buttons': buttons,
	    onshown: function(dialogRef){
	    },
	    onhide: function(dialogRef){
            },
        });

        dialog.startSpin = function () {
            dialog.getButton('next-btn').disable();
            dialog.getButton('next-btn').spin();
        };
	dialog.setGeoData= function (data) {
	    console.log(data);
	    laermTag=getLaermResult(data.laerm_tag, grenzwerte.laerm_tag);
	    laermNacht=getLaermResult(data.laerm_nacht, grenzwerte.laerm_nacht);
	    no2=getLuftResult(data.luftdaten, 'no2_i1_gb', grenzwerte.no2);
	    pm10=getLuftResult(data.luftdaten,'pm10_i1_gb', grenzwerte.pm10);
	    pm25=getLuftResult(data.luftdaten,'pm25_i1_gb', grenzwerte.pm25);
	    dialog.setMessage('<p>Addresse: '+
                              data.str+' '+
                              data.hausnr+', '+
                              data.plz+' Hamburg '+
                              '\nZuständig: '+
			      data.polizei[0].name+', '+
			      data.polizei[0].strasse+', '+
			      data.polizei[0].plz+
			      ' Hamburg </p><table border="1">'+
			      '<tr><th>Was</th><th>Wert</th><th></th><th>Ergebnis</th></tr>'+
			      '<tr><td>Lärm Tag</td><td>'+ 
			      laermTag.val_short + 
			      ' ('+ 
			      laermTag.val_long+
			      ')'+
			      '</td><td>'+
			      laermTag.img+
			      '</td><td>'+
			      laermTag.description+
			      '</td></tr>'+
			      '<tr><td>Lärm Nacht</td><td>'+
			      laermNacht.val_short + 
			      ' ('+ 
			      laermNacht.val_long+
			      ')'+
			      '</td><td>'+
			      laermNacht.img+
			      '</td><td>'+
			      laermNacht.description+
			      '</td></tr>'+
			      '<tr><td>Stickstoffdioxid NO<sub>2</sub></td><td>'+
			      no2.val_short + 
			      ' ('+ 
			      no2.val_long+
			      ')'+
			      '</td><td>'+
			      no2.img+
			      '</td><td>'+
			      no2.description+
			      '</td></tr>'+
			      '<td>Feinstaub PM<sub>2.5</sub></td><td>'+
			      pm25.val_short + 
			      ' ('+ 
			      pm25.val_long+
			      ')'+
			      '</td><td>'+
			      pm25.img+
			      '</td><td>'+
			      pm25.description+
			      '</td></tr>'+
			      '<td>Feinstaub PM<sub>10</sub></td><td>'+
			      pm10.val_short + 
			      ' ('+ 
			      pm10.val_long+
			      ')'+
			      '</td><td>'+
			      pm10.img+
			      '</td><td>'+
			      pm10.description+
			      '</td></tr>'+
			      '</table>');
            dialog.getButton('next-btn').stopSpin();
            dialog.getButton('next-btn').enable();
            $(dialog.getButton('next-btn')).removeClass('btn-disabled').addClass('btn-primary');
            if (((data.laerm_nacht.length===0) && (data.laerm_tag.length===0)) ||
                (data.luftdaten===false)  ||
	        (data.luftdaten.length===0) 
	       ) {
                $(dialog.getButton('next-btn')).text('weiter');
            }
	};
	return dialog;
    }
    return getDialog;
});

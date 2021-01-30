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
    'tempo30/view/polizeireview_ermitteln_fehler_dialog',
    'gettext!tempo30',
    'tempo30/app/tracking',
    'tempo30/view/browser_warnung_dialog',
//
], function ($, version, step1dialog, step2dialog, step3dialog, errorDialog, errorOccDialog, step4dialog, createWord, step5dialog, polizeiRvErr, gt, track, browserWarnungDialog) {

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
        else if(navigator.userAgent.indexOf("iPad") !== -1 )
        {
            return 'iPad';
        }
        else if(navigator.userAgent.indexOf("iPod") !== -1 )
        {
            return 'iPod';
        }
        else if(navigator.userAgent.indexOf("iPhone") !== -1 )
        {
            return 'iPhone';
        }
        else if(navigator.userAgent.indexOf("Android") !== -1 )
        {
            return 'Android';
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
    function doNothing() {
    }
    function start() {
        var browser= getBrowser();

        if ((browser === 'iPod') || (browser === 'iPad') || (browser === 'iPhone')) {
            browserWarnungDialog.ios({}, step1, doNothing).open();
        } else if ((browser === 'Safari')) {
            browserWarnungDialog.safari({}, step1, doNothing).open();
        } else if ((browser !== 'Chrome') && (browser !== 'Chromium') && (browser !== 'Firefox')) {
            browserWarnungDialog.unknown({}, step1, doNothing).open();
        } else {
            step1({});
        }
    }
    function step1(data) {
        step1dialog(data, step2, errorDialog).open();
    }

    function step2(data) {
        console.log(data);
        track(data,'nominatim');
        nominatimSearch(data.str, data.hausnr).done(function (d) {
            if (d.length===0) {
                track(data,'step2strNotFound');
                errorOccDialog('Fehler: Straße nicht gefunden', JSON.stringify(data)).open();
            } else {
                data.lat=d[0].lat;
                data.lon=d[0].lon;
                track(data,'step2');
                step2dialog(data, step1, step3, errorDialog).open();
            }
        }).fail(function (e) {
            track(data,'step2err');
            errorOccDialog('Fehler bei der Suche mit Nominatim', JSON.stringify(e)+JSON.stringify(data)).open();
        });
    }

    function step3(data) {
        track(data,'step3');
        var dialog=step3dialog(data, step2, step4, errorDialog);
        dialog.open();
        dialog.startSpin();
        $.ajax({
            'url': 'https://tools.adfc-hamburg.de/tempo30-backend/master/geodaten.php?lat='+data.lat+'&lon='+data.lon,
            'dataType':'json'
        }).done( function (geodata) {
            track(data,'step3geo');
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
            track(data,'step3err');
            errorOccDialog(gt('Fehler bei der Geodatensuche an tools'), JSON.stringify(e)+JSON.stringify(data)).open();
        });
    }
    function step4(data) {
        var dlg=function (data) {
            track(data,'step4');
            step4dialog(data, step3, step5, errorDialog).open();
        };
        if (
            ((data.laerm_nacht.length===0) && (data.laerm_tag.length===0)) ||
(data.luftdaten===false)  ||
(data.luftdaten.length===0) 
        ) {
            track(data,'bmu-alert');
            alert('Zu Ihrer Position liegen (evtl. zum Teil) keine Daten vor oder die Daten sind so unter der Erfassungschwelle. '+
'Ein Antrag kann aber trotzdem gestellt werden, wenn man der Meinung ist persönlich unter besonderen '+
'Verkehrslärm oder Luftverschmutzung zu leiden. Sie müssen im Antrag darlegen, warum Sie glauben, dass Ihre '+
'Straße belastet ist. z.b. weil in der Straße wo man wohnt Kopfsteinpflaster ist oder sie Nachts häufig '+
'als Abkürzung genutzt wird .. oder..\nBitte entfernen Sie den Schadstoff-Block aus Ihren Antragsvordruck.');
            dlg(data);


        } else {
            dlg(data);
        }

    }
    function step5(data) {
        console.log(data);
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
            sendToAdfc.mailContact = data.adfc_mail_contact;
            sendToAdfc.saveAnschrift = data.adfc_anschrift;
            sendToAdfc.showInMap = data.adfc_map;
            sendToAdfc.noLimit = data.adfc_all;
            track(data,'save');                    
            $.post('https://tools.adfc-hamburg.de/tempo30-backend/master/save.php', sendToAdfc).done(function (d) {
                if (d.startsWith('OK ') === false) {
                    track(data,'saveErrRes');                    
                    errorOccDialog('Fehler bei der Datenübertragung an den ADFC', d+JSON.stringify(sendToAdfc)+JSON.stringify(data)).open();

                }
            }).fail(function (e) {
                track(data,'saveErr');                    
                errorOccDialog('Fehler bei der Datenübertragung an tools', JSON.stringify(e)+JSON.stringify(data)).open();

            });
        }
        var browser=getBrowser();
        if ((browser === 'iPod') || (browser === 'iPad') || (browser === 'iPhone') || (browser === 'Safari')) {
            track(data,'safari');
            var step5dlg= step5dialog(data, step4, step6, errorDialog, false);
            step5dlg.open();
            createWord.dialog(data, step5dlg);
        } else {
            track(data,'createWord');                    
            createWord.download(data);

            track(data,'step5');                    
            step5dialog(data, step4, step6, errorDialog, true).open();
        } 

    }
    function step6( data) {
        track(data,'step6');                    
        // do nothing
    }
    return start;

});

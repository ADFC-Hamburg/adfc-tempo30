define('tempo30/view/result_dialog', [
    'jquery',
    'bootstrap',
    'bootstrap-dialog',
    'gettext!tempo30', 
], function ($, bootstrap, BootstrapDialog, gt) {

    'use strict';

    function getDialog(data, backCb, nextCb) {
	var lat = data.lat, lon= data.lon;
	var buttons=[
	    {
		id: 'back-btn',
		label: gt('zurück'),
		title: gt('zu Schritt 1'),
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
		cssClass: 'btn-primary',
		title: gt('Zeigt den Antragstext in einem neuen Fenster'),
		action: function (dialogRef) {
		    dialogRef.close();
		    data.lat=lat;
		    data.lon=lon;
		    nextCb(data);
		}
	    }];
	
	var dialog = new BootstrapDialog({
            'title': gt('Tempo 30 benatragen, Schritt 3: Ergebnisse'),
            'message': gt('Bitte kontrollieren Sie die Position und verschieben Sie ggf. den Marker an Ihren Wohnort durch einen Klick')+
		'<table border="1">'+
		'<tr><th>Was</th><th>Ergebnis</th></tr>'+
		'<tr><td>Lärm Tag</td><td><img src="img/1f610.svg" alt="neutraler Smiley" style="width:100px"/>Die Grenzwerte sind kurz davor zu überschreiten</td></tr>'+
		'<tr><td>Lärm Nacht</td><td><img src="img/1f621.svg" alt="böser Smiley" style="width:100px"/>Die Grenzwerte sind überschritten</td></tr>'+
		'<tr><td>No2</td><td><img src="img/263a.svg" alt="lachender Smiley" style="width:100px"/>Die Werte sind okay.</td></tr>'+
		'<tr><td>PM2.5</td><td><img src="img/2049.svg" alt="?!" style="width:100px"/>Wir haben keine Messwerte.</td></tr>'+
		'<tr><td>PM10</td><td>Die Grenzwerte sind überschritten</td></tr>'+
		'</table>',
            'buttons': buttons,
	    onshown: function(dialogRef){
		console.log(lat,lon);
	    },
	    onhide: function(dialogRef){
            },
        });
 
	return dialog;
    }
    return getDialog;
});
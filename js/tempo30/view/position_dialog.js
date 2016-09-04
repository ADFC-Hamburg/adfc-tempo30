define('tempo30/view/position_dialog', [
    'jquery',
    'bootstrap',
    'bootstrap-dialog',
    'gettext!tempo30', 
    'tempo30/view/positionmap',
    'tempo30/model/geoUtil',
], function ($, bootstrap, BootstrapDialog, gt, createMap, geoUtil) {

    'use strict';

 var buttons=[
     {
         id: 'back-btn',
         label: gt('zurück'),
         title: gt('zu Schritt 1'),
         action: function (dialogRef) {
	     alert('Not implemented yet');
	 }
     },
     {
         id: 'next-btn',
         label: gt('weiter'),
         title: gt('Zeigt den Antragstext in einem neuen Fenster'),
         action: function (dialogRef) {

	 }
     }];
    function getDialog(lat, lon) {
	var dialog = new BootstrapDialog({
            'title': gt('Tempo 30 benatragen, Schritt 2: Bestätigen Sie Ihren Wohnort'),
            'message': gt('Bitte kontrollieren Sie die Position und verschieben Sie ggf. den Marker an Ihren Wohnort durch einen Klick')+
		'<div id="positionmap" style="width:100%; height: 400px;"></div>',
            'buttons': buttons,
	    onshown: function(dialogRef){
		console.log(lat,lon);
		var map=createMap('positionmap', lat, lon);
		console.log(geoUtil.bboxDist(lat, lon, 0.2));
	    },
	    onhide: function(dialogRef){
            },
        });
 
	return dialog;
    }
    return getDialog;
});
define('tempo30/view/str_wahl_dialog', [
    'jquery',
    'bootstrap',
    'bootstrap-dialog',
    'gettext!tempo30', 
    'tempo30/view/positionmap',
    'tempo30/model/geoUtil',
    'tempo30/model/overpassUtil',
    'text!tempo30/overpass/t50_strassen_in_bbox.txt',
], function ($, bootstrap, BootstrapDialog, gt, createMap, geoUtil, opUtil, ovT50Query) {

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
	     alert('Not implemented yet');
	 }
     }];
    function getDialog(lat, lon) {

	var bbox=geoUtil.bboxDist(lat, lon, 200);
	console.log(lat,lon, bbox);	
	var dialog = new BootstrapDialog({
	    'title': gt('Tempo 30 benatragen, Schritt 3: Für welche Straßen wollen Sie Tempo 30 benatragen?'),
	    'message': gt('Bitte warten, Straßen in der nähe werden gesucht...'),
	    'buttons': buttons,
	    onshown: function(dialogRef){
	
	    },
	    onhide: function(dialogRef){
	    },
        });
	opUtil.getResult(opUtil.replaceBBox(ovT50Query, bbox)).done(function (r) {
	    console.log(r.elements);
	    if (r.elements.length === 0) {
		dialog.setMessage(gt('Keine Straßen mit hoher Geschwindigkeit gefunden'));
		// FIXME siehe Issue: #11
		// es gibt keine Straßen in ihrer Nähe
	    } else {
		var msg=gt('Für welche Straßen wollen Sie Tempo 30 benatragen?');
		var str={};
		$.each(r.elements, function (idx, obj) {
		    if (obj.type === 'way') {
			var name = obj.tags.name || obj.tags.ref || 'unbenannte Straße';
			str[name] =1;
		    }
		});
		$.each(str,function (name) {
		    msg=msg+'<div class="checkbox"> <label><input type="checkbox" value="'+name+'" checked="1">'+name+'</label></div>';
		});
		dialog.setMessage(msg);
	    }

	});
	return dialog;
    }
    return getDialog;
});
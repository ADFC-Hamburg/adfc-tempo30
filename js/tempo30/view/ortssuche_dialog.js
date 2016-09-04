define('tempo30/view/ortssuche_dialog', [
    'jquery',
    'bootstrap',
    'bootstrap-dialog',
    'gettext!tempo30', 
    'text!tempo30/overpass/hausnummernsuche.txt',
    'tempo30/view/position_dialog',
    'bootstraptypehead',
], function ($, bootstrap, BootstrapDialog, gt, hausnummernsucheTxt, positionDialog) {

  'use strict';

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

    function getOverpassResult(query) {
    var baseurl='https://overpass-api.de/api/interpreter';
	var url = baseurl + '?data=' + 
	    encodeURIComponent(query);
        console.log(url);
        return $.ajax({
	    'url':url,
	    'dataType':'json'
	});
    }
    function getHausnummerResult(strasse) {
	var query = hausnummernsucheTxt.replace(new RegExp('STRASSE','g'),strasse);
	return getOverpassResult(query);
    }

 var buttons=[{
            id: 'overpass-btn',
            label: gt('weiter'),
            title: gt('Zeigt den Antragstext in einem neuen Fenster'),
            action: function (dialogRef) {
                var str = dialogRef.getModalBody().find('#str').val();
                var name = dialogRef.getModalBody().find('#name').val();
                var hausnr = dialogRef.getModalBody().find('#hausnr').val();
                if($.trim(str) === '') {
                    alert('Bitte geben Sie eine Straße an');
                    return false;
                }
                if($.trim(name) === '') {
                    alert('Bitte geben Sie einen Namen an');
                    return false;
                }
                if($.trim(hausnr) === '') {
                    alert('Bitte geben Sie eine Hausnummer an');
                    return false;
                }
		dialogRef.close();
		nominatimSearch(str, hausnr).done(function (d) {
		    console.log(d);
		    positionDialog(d[0].lat, d[0].lon).open();
		}).fail(function (e) {
		    console.error(e);
		    alert('Fehler');
		});

	/*	getHausnummerResult($.trim(str)).done(function (d) {
		    console.log(d);
		}).fail(function (e) {
		    console.error(e);
		});*/

//                window.open('http://overpass-turbo.eu/s/dWT', '_blank');
            }
 }];
    function getDialog() {
	var dialog = new BootstrapDialog({
            'title': gt('Tempo 30 benatragen, Schritt 1: Ort Suchen'),
            'message': gt('Bitte geben Sie Ihre Anschrift an:')+'<b>ACHTUNG NOCH NICHT FERTIG</b>'+
                '\n\n'+
                gt('Name')+
		'<input type="text" id="name" class="form-control">'+
                '\n'+
                gt('Straße')+
		'<input type="text" id="str" class="form-control">'+
                '\n'+
                gt('Hausnummer')+
		'<input type="text" id="hausnr" class="form-control">',
            'buttons': buttons,
	    onshown: function(dialogRef){
		dialogRef.getModalBody().find('#str').prop('disabled', true);
		
		$.get('data/strassenliste.json').done(function (strassenListe) {
		    dialogRef.getModalBody().find('#str').typeahead({source:strassenListe});
		    dialogRef.getModalBody().find('#str').prop('disabled', false);
		}).error(function (err) {
		    alert(err);
		});
	    },
	    onhide: function(dialogRef){
            },
        });
 
	return dialog;
    }
    return getDialog;

});
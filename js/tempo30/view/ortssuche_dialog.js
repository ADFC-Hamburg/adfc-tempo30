define('tempo30/view/ortssuche_dialog', [
    'jquery',
    'bootstrap',
    'bootstrap-dialog',
    'gettext!tempo30', 
    'text!tempo30/overpass/hausnummernsuche.txt',
    'bootstraptypehead',
], function ($, bootstrap, BootstrapDialog, gt, hausnummernsucheTxt) {

  'use strict';

    function getDialog(callback) {
	var buttons=[{
	    id: 'btn-more',
	    cssClass: 'btn-primary',
            label: gt('weiter'),
            title: gt('Zeigt den Antragstext in einem neuen Fenster'),
            action: function (dialogRef) {
                var str = dialogRef.getModalBody().find('#str').val();
                var hausnr = dialogRef.getModalBody().find('#hausnr').val();
		var plz = dialogRef.getModalBody().find('#plz').val();
                if($.trim(str) === '') {
                    alert('Bitte geben Sie eine Straße an');
                    return false;
                }
                if($.trim(hausnr) === '') {
                    alert('Bitte geben Sie eine Hausnummer an');
                    return false;
                }
                if($.trim(plz) === '') {
                    alert('Bitte geben Sie eine PLZ an');
                    return false;
                }
		dialogRef.close();
		callback({
		    str:str,
		    name:name,
		    hausnr:hausnr,
		    plz:plz,
		});
            }
	}];

	var dialog = new BootstrapDialog({
            'title': gt('Tempo 30 beantragen, Schritt 1: Ort Suchen'),
            'message': gt('Bitte geben Sie Ihre Anschrift an:')+
                '\n\n'+
                gt('Straße')+
		'<input type="text" id="str" class="form-control">\n'+
                gt('Hausnummer')+
		'<input type="text" id="hausnr" class="form-control">\n'+
                gt('PLZ')+
		'<input type="text" id="plz" class="form-control">',
            'buttons': buttons,
	    onshown: function(dialogRef){
		dialogRef.getModalBody().find('#str').prop('disabled', true);
		debugger;
		var url=requirejs.toUrl('data/strassenliste.json');
		$.get(url).done(function (strassenListe) {
		    dialogRef.getModalBody().find('#str').typeahead({source:strassenListe});
		    dialogRef.getModalBody().find('#str').prop('disabled', false);
		    dialogRef.getModalBody().find('#str').focus();
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

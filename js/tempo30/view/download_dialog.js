define('tempo30/view/download_dialog', [
    'jquery',
    'bootstrap',
    'bootstrap-dialog',
    'gettext!tempo30', 
], function ($, bootstrap, BootstrapDialog, gt) {

  'use strict';

    function getDialog(data, backCb, nextCb) {	var buttons=[
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
		id: 'next-btn',
		label: gt('weiter'),
//		cssClass: 'btn-primary',
		title: gt('Zeigt den Antragstext in einem neuen Fenster'),
		action: function (dialogRef) {
		    data.antrag_str = $.trim(dialogRef.getModalBody().find('#antrag_str').val());
		    data.name = $.trim(dialogRef.getModalBody().find('#name').val());
		    data.email = $.trim(dialogRef.getModalBody().find('#email').val());
		    data.newsletter = dialogRef.getModalBody().find('#newsletter').prop('checked');
		    data.adfc_contact = dialogRef.getModalBody().find('#adfc').prop('checked');
		    dialogRef.close();
		    nextCb(data);
		}
	    }];
	var dialog = new BootstrapDialog({
            'title': gt('Tempo 30 benatragen, Schritt 4: Antrag herunterladen, bearbeiten, unterschreiben und abschicken.'),
            'message': gt('Noch ein Schritt, dann wird ihnen ein Antragsentwurf zu Download angeboten. Bitte ergänzen Sie folgende Daten:')+
	        '\n\n'+
	        gt('Straße für die Sie Tempo 30 beantragen (die Straße muss an Ihr Haus angrenzen)')+
		'<input type="text" id="antrag_str" class="form-control">\n'+
                gt('Ihr Name (optional):')+
		'<input type="text" id="name" class="form-control">\n'+
		'<div class="checkbox"><label><input type="checkbox" id="newsletter" value="">Ich möchte den Newsletter erhalten</label></div>'+
		'<div class="checkbox"><label><input type="checkbox" id="adfc" value="">Der ADFC darf meine E-Mailaddresse speichern und mich für Rückfragen zum Antrag kontaktieren.</label></div>\n'+
		gt('Ihre E-Mailaddresse:')+
		'<input type="email" id="email" class="form-control">'+

		'',
            'buttons': buttons,
	    onshown: function(dialogRef){
		var body=dialogRef.getModalBody();
		body.find('#antrag_str').prop('value', data.str);
		body.find('#email').prop('disabled', true);
		function changeEmailStatus () {
		    body.find('#email').prop('disabled',
					     (!(body.find('#newsletter').prop('checked') ||
						body.find('#adfc').prop('checked'))));
		}
		body.find('#newsletter').change(changeEmailStatus);
		body.find('#adfc').change(changeEmailStatus);

	    },
	    onhide: function(dialogRef){
            },
        });
 
	return dialog;
    }
    return getDialog;
});
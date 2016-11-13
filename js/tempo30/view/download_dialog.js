define('tempo30/view/download_dialog', [
    'jquery',
    'bootstrap',
    'bootstrap-dialog',
    'gettext!tempo30', 
], function ($, bootstrap, BootstrapDialog, gt) {

  'use strict';

    function getDialog(data, backCb, nextCb, errorDialog) {
	var buttons=[
                {
                id: 'btn-err',
	        cssClass: 'btn-link adfc-antrag-btn-err',
                label: gt('Fehler/Problem melden'),
                action: function (dialogRef) {
                    errorDialog('Problem mit dem Tempo30 Antrag 4', '(Schritt 4:'+JSON.stringify(data)+')').open();
                }
            },
	    {
		id: 'back-btn',
		label: gt('zurück'),
		title: gt('zu Schritt 3'),
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
		    data.adfc_mail_contact = dialogRef.getModalBody().find('#adfc').prop('checked');
		    data.adfc_anschrift = dialogRef.getModalBody().find('#strasse').prop('checked');
		    data.adfc_map = dialogRef.getModalBody().find('#position').prop('checked');
		    data.adfc_all = dialogRef.getModalBody().find('#freigabe').prop('checked');
		    if(data.antrag_str === '') {
			alert(gt('Bitte geben Sie eine Straße für den Antrag an'));
			return false;
                    }
		    if ((data.email === '') && (data.adfc_mail_contact || data.newsletter || data.adfc_all)) {
			alert(gt('Bitte geben Sie eine eMail-Adresse an'));
			return false;
                    }
		    dialogRef.close();
		    nextCb(data);
		}
	    }];
	var dialog = new BootstrapDialog({
            'title': gt('Tempo 30 benatragen, Schritt 4: Antrag vorbereiten.'),
            'message': gt('Noch ein Schritt, dann wird ihnen ein Antragsentwurf zu Download angeboten. Bitte ergänzen Sie folgende Daten:')+
	        '\n\n'+
	        gt('Straße für die Sie Tempo 30 beantragen (die Straße muss an Ihr Haus angrenzen)')+
		'<input type="text" id="antrag_str" class="form-control">\n'+
                gt('Ihr Name (optional):')+
		'<input type="text" id="name" class="form-control">\n'+
		'<div class="checkbox"><label><input type="checkbox" id="newsletter" value="">Ich möchte den ADFC Newsletter erhalten</label></div>'+
		'<div class="checkbox"><label><input type="checkbox" id="adfc" value="">Der ADFC darf meine E-Mailaddresse und den Bezirk speichern und mich für Rückfragen zum Antrag kontaktieren und den Antrag statistisch auswerten.</label></div>'+
		'<div class="checkbox"><label><input type="checkbox" id="strasse" value="">Der ADFC darf meinen Namen, und die Anschrift speichern (hilfreich um z.B. (nach Rückfrage) Mitstreiter in der Nachbarschaft zu finden).</label></div>'+
		'<div class="checkbox"><label><input type="checkbox" id="position" value="">Auf einer Tempo30-Antrags-Landkarte darf die Position des Antrags angezeigt werden (ohne Namensnennung).</label></div>'+
		'<div class="checkbox"><label><input type="checkbox" id="freigabe" value="">Ich erlaube dem ADFC, meinen Namen, die Anschrift und E-Mail ohne Rückfrage zu veröffentlichen.</label></div>\n'+
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
						body.find('#adfc').prop('checked') ||
						body.find('#freigabe').prop('checked')
					       )));
		}
		body.find('#newsletter').change(changeEmailStatus);
		body.find('#adfc').change(changeEmailStatus);
		body.find('#freigabe').change(changeEmailStatus);

	    },
	    onhide: function(dialogRef){
            },
        });
 
	return dialog;
    }
    return getDialog;
});

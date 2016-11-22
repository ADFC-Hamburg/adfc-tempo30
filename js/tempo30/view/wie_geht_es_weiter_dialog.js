define('tempo30/view/wie_geht_es_weiter_dialog', [
    'jquery',
    'bootstrap',
    'bootstrap-dialog',
    'gettext!tempo30', 
], function ($, bootstrap, BootstrapDialog, gt) {

  'use strict';

    function getDialog(data, backCb, nextCb,errorDialog) {
	var buttons=[
                {
                id: 'btn-err',
	        cssClass: 'btn-link adfc-antrag-btn-err',
                label: gt('Fehler/Problem melden'),
                action: function (dialogRef) {
                    errorDialog('Problem mit dem Tempo30 Antrag 5', '(Schritt 5:'+JSON.stringify(data)+')').open();
                }
            },
	    {
		id: 'back-btn',
		label: gt('zurück'),
		title: gt('zu Schritt 4'),
		action: function (dialogRef) {
		    dialogRef.close();
		    backCb(data);
		}
	    },
	    {
		id: 'next-btn',
		label: gt('beenden'),
//		cssClass: 'btn-primary',
		action: function (dialogRef) {
		    dialogRef.close();
		}
	    }];

        var verifyMsg='';
	if (data.newsletter || data.adfc_mail_contact) {
            verifyMsg=gt('<li>Rufen Sie bitte Ihre E-Mails ab. Klicken Sie auf den Link und bestätigen Sie so Ihre E-Mailadresse.</li>');
        }
        var askFeedback="";
        if (data.askFeedback) {
            askFeedback=gt("<li><b>Sie haben mit einen uns unbekannten Browser unsere Anwendung getestet. Bitte geben Sie uns Rückmeldung, indem Sie auf den Button: 'Fehler/Problem melden' klicken.</b></li>");
        }
	var dialog = new BootstrapDialog({
            'title': gt('Tempo 30 beantragen, Schritt 5: Antrag herunterladen, bearbeiten, unterschreiben und abschicken.'),
            'message': 'Unser System hat soeben einen Download (Dateiname: tempo30-antrag.docx) angestoßen. Je nach Browsereinstellung ist der Download schon erfolgt oder Sie müssen ihm in einem Fenster noch zustimmen.<ol>'+
		verifyMsg+
		gt('<li>Bitte vervollständigen Sie den Antrag an den gekennzeichneten Stellen. Wollen Sie die Bearbeitung in einem Schreibprogramm vornehmen, müssen Sie den Antrag zunächst speichern.</li>')+
		gt('<li>Ausdrucken</li>')+
		gt('<li>Unterschreiben</li><li>Abschicken (sollten Sie den Antrag persönlich abgeben, zweimal ausdrucken und den Empfang auf dem einen Exemplar bestätigen lassen)</li>')+
                askFeedback+
		gt('<li><a href="http://hamburg.adfc.de/newsletter/newsletter-abonnieren/" target="_blank">Abonnieren Sie den ADFC-Newsletter</a>')+
		gt('<li>Erzählen Sie es weiter, z.B. auf Twitter oder Facebook</li>')+
		gt('<li>Bitte schreiben Sie <a href="mailto:laueft@hamburg.adfc.de">uns</a>, ob/wie wir den Antrags-Prozess noch besser machen können.</li>')+ 
                '</ol>',
            'buttons': buttons,
        });
 
	return dialog;
    }
    return getDialog;
});

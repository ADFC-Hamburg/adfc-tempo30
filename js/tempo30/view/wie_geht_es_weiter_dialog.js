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
            verifyMsg=gt('<li>Rufen Sie bitte Ihre E-Mails ab. Die Nachricht von uns enthält einen Link, der Sie zur Bestätigung führt. Klicken Sie einfach auf den Link und bestätigen Sie so Ihre Registrierung.</li>');
        }
	var dialog = new BootstrapDialog({
            'title': gt('Tempo 30 beantragen, Schritt 5: Antrag herunterladen, bearbeiten, unterschreiben und abschicken.'),
            'message': 'Sie sollten den Antrag soeben heruntergeladen haben (Dateiname: tempo30-antrag.docx).<ol>'+
		verifyMsg+
		gt('<li>Bitte vervollständigen Sie den Antrag an den gekennzeichneten Stellen. Wollen Sie die Bearbeitung in einem Schreibprogramm vornehmen, müssen Sie den Antrag zunächst speichern.</li>')+
		gt('<li>Ausdrucken</li>')+
		gt('<li>Unterschreiben</li><li>Abschicken (sollten Sie den Antrag persönlich abgeben, zweimal ausdrucken und den Empfang auf dem einen Exemplar bestätigen lassen)</li>')+
		gt('<li><a href="http://hamburg.adfc.de/newsletter/newsletter-abonnieren/" target="_blank">Abonieren Sie den ADFC Newsletter</a>')+
		gt('<li>Erzählen Sie es weiter, z.B. auf Twitter oder Facebook</li>')+
		gt('<li>Bitte schreiben Sie <a href="mailto:laueft@hamburg.adfc.de">uns</a>, ob/wie wir den Antrags-Prozess noch besser machen können.</li>')+ 
                '</ol>',
            'buttons': buttons,
        });
 
	return dialog;
    }
    return getDialog;
});

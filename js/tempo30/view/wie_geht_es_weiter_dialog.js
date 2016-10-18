define('tempo30/view/wie_geht_es_weiter_dialog', [
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
		label: gt('beenden'),
//		cssClass: 'btn-primary',
		action: function (dialogRef) {
		    dialogRef.close();
		}
	    }];
	var dialog = new BootstrapDialog({
            'title': gt('Tempo 30 benatragen, Schritt 5: Antrag herunterladen, bearbeiten, unterschreiben und abschicken.'),
            'message': 'Sie sollten den Antrag soeben heruntergalden haben.<ol>'+
		gt('<li>Bitte bearbeiten Sie den Antrag. Der Antrag ist so NICHT FERTIG, passen Sie ihn bitte an die Situation vor Ort an.</li>')+
		gt('<li>Ausdrucken</li>')+
		gt('<li>Unterschreiben</li><li>Abschicken (sollten Sie den Antrag persönlich abgeben, zweimal ausdrucken und den Empfang auf dem einen Exemplar bestätigen)</li>')+
		gt('<li>(Optional) Den Antrag (oder alles was sie uns erzählen mögen, z.B. die Straße oder den Ort) bitte auch an uns schicken</li>')+ //FIXME
		gt('<li>(Optional) Erzählen Sie es weiter, z.B. auf Twitter oder Facebook</li>')+ //FIXME
		gt('<li>(Optional) Bitte schreiben Sie uns, ob/wie wir den Antrags-Prozess noch besser machen können.</li>')+ //FIXME

                '</ol>',
            'buttons': buttons,
	    onshown: function(dialogRef){
		dialogRef.getModalBody().find('#data').prop('value', JSON.stringify(data));
	    },
	    onhide: function(dialogRef){
            },
        });
 
	return dialog;
    }
    return getDialog;
});
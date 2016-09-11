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
		label: gt('beenden'),
//		cssClass: 'btn-primary',
		title: gt('Zeigt den Antragstext in einem neuen Fenster'),
		action: function (dialogRef) {
		    dialogRef.close();
		}
	    }];
	var dialog = new BootstrapDialog({
            'title': gt('Tempo 30 benatragen, Schritt 4: Antrag herunterladen, bearbeiten, unterschreiben und abschicken.'),
            'message': gt('<ol><li>. Laden Sie unseren Antragsentwurf herunter:')+
		'<form action="https://tools.adfc-hamburg.de/tempo30-backend/master/antrag.php" method="POST" accept-charset="UTF-8" target="_blank"><input type="hidden" id="data" name="data" value=""/><button type="submit" class="btn btn-primary" id="next-btn">Antrag speichern</button></form></li>'+
		gt('<li>Bitte bearbeiten Sie den Antrag. Der Antrag ist so NICHT FERTIG, passen Sie ihn bitte an die Situation vor Ort an.</li>')+
		gt('<li>Unterschreiben -> Abschicken (sollten Sie den Antrag persönlich abgeben, zweimal ausdrucken und den Empfang auf dem einen exemplar bestätigen)</li>')+
		gt('<li>(Optional) Den Antrag bitte auch an uns schicken</li>')+ //FIXME
		gt('<li>(Optional) Sich in unserem Newsletter eintragen</li>')+ //FIXME
		gt('<li>Erzählen Sie es weiter, z.B. auf Twitter oder Facebook</li>'), //FIXME
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
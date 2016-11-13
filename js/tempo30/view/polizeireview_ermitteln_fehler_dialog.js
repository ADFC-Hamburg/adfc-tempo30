define('tempo30/view/polizeireview_ermitteln_fehler_dialog', [
    'jquery',
    'tempo30/model/version',
    'bootstrap',
    'bootstrap-dialog',
    'gettext!tempo30', 
], function ($, version, bootstrap, BootstrapDialog, gt) {

    'use strict';
    var url="https://www.hamburg.de/behoerdenfinder/hamburg/11262156/";
    function getDialog(data, errorDialog) {
	var buttons=[
            {
            id: 'btn-err',
	    cssClass: 'btn-primary',
            label: gt('Fehler/Problem melden'),
                action: function (dialogRef) {
                    dialogRef.close();
                    errorDialog('Polizeireview ermitteln.', '(Polizei suche:'+JSON.stringify(data)+')').open();
                }
            }, {
		id: 'cancel-btn',
		label: gt('schließen'),
		cssClass: 'btn-warning',
		action: function (dialogRef) {
		    dialogRef.close();
		}
	    }];

	var dialog = new BootstrapDialog({
	    'type': BootstrapDialog.TYPE_WARNING,
	    'title': gt('Konnten das Polizeirevier nicht ermitteln'),
	    'message': gt('Leider konnten wir das Polizeirevier nicht ermitteln. Wir werden an dieser Stelle im Antrag einen Platzhalter einfügen, den sie manuell ersetzen müssen. Sie finden das Polizeirevier z.B. über den <a href="'+url+'" target="_blank">Behördenfinder der Stadt Hamburg</a>. Wenn Ihre Adresse wirklich in Hamburg liegt, melden Sie uns gerne einen Fehler, damit wir unser Tool verbessern können.')+gt('Vielen Dank!'),
	    'buttons': buttons
        });
	return dialog;
    }
    return getDialog;
});

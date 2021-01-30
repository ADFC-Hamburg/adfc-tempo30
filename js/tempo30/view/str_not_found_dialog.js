define('tempo30/view/str_not_found_dialog', [
    'jquery',
    'bootstrap',
    'bootstrap-dialog',
    'gettext!tempo30', 
], function ($, bootstrap, BootstrapDialog, gt) {

    'use strict';

    function getDialog(data, cbBack, cbCancel, cbError) {
        var buttons=[
            {
                id: 'back-btn',
                label: gt('zurück'),
                title: gt('zu Schritt 2'),
                cssClass: 'btn-default',
                action: function (dialogRef) {
                    dialogRef.close();
                    cbBack(data);
                }
            },
            {
                id: 'cancel-btn',
                label: gt('Abbruch'),
                cssClass: 'btn-warning',
                action: function (dialogRef) {
                    dialogRef.close();
                    cbCancel(data);
                }
            },
            {
                id: 'error-btn',
                label: gt('Problem melden'),
                cssClass: 'btn-danger',
                action: function (dialogRef) {
                    dialogRef.close();
                    cbError(data);
                }
            }];

        var dialog = new BootstrapDialog({
            'type': BootstrapDialog.TYPE_WARNING,
            'title': gt('Tempo 30 beantragen, Keine Hauptstraßen gefunden'),
            'message': gt('Für einen erfolgreichen Antrag ist es nötig, dass sie in der Nähe einer Straße mit Tempo 50 wohnen. Wir konnten leider keine finden. Bitte melden Sie einen Fehler, wenn es doch eine Tempo 50 Straße in der Nähe gibt.'),
            'buttons': buttons,
        });
        return dialog;
    }
    return getDialog;
});
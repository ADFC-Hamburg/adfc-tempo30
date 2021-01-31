define('tempo30/view/ortssuche_dialog', [
    'jquery',
    'bootstrap',
    'bootstrap-dialog',
    'gettext!tempo30',
    'text!tempo30/overpass/hausnummernsuche.txt',
    'bootstraptypehead',
], function ($, bootstrap, BootstrapDialog, gt, hausnummernsucheTxt) {

    'use strict';

    function getDialog(data, callback, errorDialog) {
        var buttons=[{
            id: 'btn-err',
            cssClass: 'btn-link adfc-antrag-btn-err',
            label: gt('Fehler/Problem melden'),
            action: function (dialogRef) {
                errorDialog('Problem mit dem Tempo30 Antrag', '(Schritt 1)'+JSON.stringify(data)).open();
            }
        },{
            id: 'btn-more',
            cssClass: 'btn-primary',
            label: gt('weiter'),
            title: gt('Zeigt den Antragstext in einem neuen Fenster'),
            action: function (dialogRef) {
                var str = dialogRef.getModalBody().find('#str').val();
                var hausnr = dialogRef.getModalBody().find('#hausnr').val();
                var plz = dialogRef.getModalBody().find('#plz').val();
                var tracking = dialogRef.getModalBody().find('#tracking').prop('checked');
                if (tracking) {
                    tracking = 	Math.floor(Math.random() *10000000)+1;
                } else {
                    tracking = 0;
                }
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
                data.str=str;
                data.hausnr=hausnr;
                data.plz=plz;
                data.tracking=tracking;
                callback(data);
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
'<input type="text" id="plz" class="form-control">\n'+
'<div class="checkbox"><label><input type="checkbox" id="tracking" value="">'+
gt('Meine Surfverhalten im Tempo30-Antrag darf für Verbesserungen aufgezeichnet werden.')+
'</label></div>',
            'buttons': buttons,
            onshown: function(dialogRef){
                dialogRef.getModalBody().find('#str').prop('disabled', true);
                var url=requirejs.toUrl('data/strassenliste.json');
                $.get(url).done(function (strassenListe) {
                    dialogRef.getModalBody().find('#str').typeahead({source:strassenListe});
                    dialogRef.getModalBody().find('#str').prop('disabled', false);
                    dialogRef.getModalBody().find('#str').focus();
                }).fail(function (err) {
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

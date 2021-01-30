define('tempo30/view/bmu_daten_anfrage', [
    'jquery',
    'bootstrap',
    'bootstrap-dialog',
    'gettext!tempo30', 
], function ($, bootstrap, BootstrapDialog, gt) {

    'use strict';

    var mailadr='transparenzgesetz@bue.hamburg.de';

    function getDialog(data, next, errorDialog) {

        var subject="Umweltdaten "+data.str;
        var msg="Sehr geehrte Damen und Herren,\n bitte senden Sie mir zu Daten zur Schadstoff und Lärmbelastung an meiner Adresse:"+data.str+" "+data.hausnr+", "+data.plz+' Hamburg\n'+
'Konkret interssiert mich:\n'+
' a) Verkehrslärm (Straße) tagsüber,\n'+
' b) Verkehrslärm (Straße) nachts,\n'+
' c) PM10-Emissionen,\n'+
' d) PM2.5-Emissionen und\n'+
' e) Stickstoffdioxid-Emissionen.\n\n'+

'Dies ist ein Antrag auf Zugang zu Information nach § 1 Hamburgisches Transparenzgesetz (HmbTG).\n'+

'Ausschlussgründe liegen meines Erachtens nicht vor. Sofern Teile der Information durch Ausschlussgründe geschützt sind, beantrage ich mir die nicht geschützten Teile zugänglich zu machen.\n\n'+

'Ich bitte Sie zu prüfen, ob Sie mir die erbetene Auskunft auf elektronischem Wege kostenfrei erteilen können. Sollte die Aktenauskunft Ihres Erachtens in jedem Fall gebührenpflichtig sein, möchte ich Sie bitten, mir dies vorab mitzuteilen und dabei die Höhe der Kosten anzugeben.\n\n'+

'Ich verweise auf § 13 Abs. 1 HmbTG sowie § 3 Abs. 3 Satz 2 Nr. 1 UIG und bitte Sie, mir die erbetenen Informationen unverzüglich und nur im Ausnahmefall spätestens nach Ablauf eines Monats nach Antragszugang zugänglich zu machen.\ņ\n'+

'Sollten Sie für diesen Antrag nicht zuständig sein, bitte ich Sie, ihn an die zuständige Behörde weiterzuleiten und mich darüber zu unterrichten.\n\n'+

'Ich möchte Sie um eine Antwort in elektronischer Form (E-Mail) bitten und behalte mir vor, nach Eingang Ihrer Auskünfte um weitere ergänzende Auskünfte oder auch um Akteneinsicht nachzusuchen.\n\n'+

'Ich bitte Sie um eine Empfangsbestätigung und danke für Ihre Mühe!\n\n'+
'Mit freundlichen Grüßen\n';


        var buttons=[
            {
                id: 'btn-err',
                cssClass: 'btn-link adfc-antrag-btn-err',
                label: gt('Fehler/Problem melden'),
                action: function (dialogRef) {
                    errorDialog('Problem mit dem Tempo30 Antrag BUE-Dialog', '(Schritt Bue-Dialog:'+JSON.stringify(data)+')').open();
                }
            },
            {
                id: 'btn-mail',
                label:'Mail an '+mailadr,
                cssClass: 'btn-diabled',
            },
            {
                id: 'fragDenStaat',
                label: 'Zu FragDenStaat',
                cssClass: 'btn-info',
                action: function (dialogRef) {
                    window.open('https://fragdenstaat.de/anfrage-stellen/an/behorde-fur-umwelt-und-energie-hamburg/', '_blank');
                }
            },
            {
                id: 'cancel-btn',
                label: gt('weiter'),
                cssClass: 'btn-warning',
                action: function (dialogRef) {
                    dialogRef.close();
                    next(data);
                }
            }];

        var dialog = new BootstrapDialog({
            'type': BootstrapDialog.TYPE_WARNING,
            'title': gt('Fehlende Umweltdaten'),
            'message': gt('Leider fehlen uns für Ihre Position Lärm und/oder Schadstoffdaten, da diese bislang nicht veröffentlicht wurden. Sie können einen Antrag auch ohne diese Daten stellen. In diesem Fall streichen Sie einfach den Umweltdatenblock aus dem Antrag. Wir empfehlen allerdings die Daten bei der Behörde für Umwelt und Energie zu erfragen. Das sollte kostenlos sein. Dazu schicken Sie eine E-Mail an die Behörde für Umwelt und Energie (')+mailadr+gt(') oder erstellen Sie eine Anfrage auf FragDenStaat.de.')+' '+gt('Hier ein Textvorschlag:')+'<br/><b>Betreff: </b>'+subject+'<br/><textarea id="txt" style="width:100%; height:200px;" readonly>'+msg+'</textarea></br>'+gt('Vielen Dank!'),
            'buttons': buttons,
            onshown: function(dialogRef){
                dialogRef.getModalBody().find('#txt').text(msg);
                $(dialogRef.getButton('btn-mail')).replaceWith(
                    $('<a class="btn btn-primary" target="_blank">').prop("href", "mailto:"+mailadr+'?subject='+encodeURIComponent(subject)+'&body='+encodeURIComponent(msg))
                        .text(gt('Mail an BUE')));
            }
        });
        return dialog;
    }
    return getDialog;
});

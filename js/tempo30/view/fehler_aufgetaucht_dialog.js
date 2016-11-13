define('tempo30/view/fehler_aufgetaucht_dialog', [
    'jquery',
    'tempo30/model/version',
    'bootstrap',
    'bootstrap-dialog',
    'gettext!tempo30', 
], function ($, version, bootstrap, BootstrapDialog, gt) {

    'use strict';

    var mailadr='adfcmap-fehler-2016@sven.anders.hamburg';
    var githubUrl='https://github.com/tabacha/adfc-tempo30/issues/new';
    function getDialog(subject, msg) {
        subject = '('+version.revision+') '+subject;
        msg = msg+' V:'+version.revision;
	var buttons=[
	    {
		id: 'cancel-btn',
		label: gt('schließen'),
		cssClass: 'btn-warning',
		action: function (dialogRef) {
		    dialogRef.close();
		}
	    }];

	var dialog = new BootstrapDialog({
	    'type': BootstrapDialog.TYPE_DANGER,
	    'title': gt('Fehler aufgetreten'),
	    'message': gt('Ups, leider ist ein Fehler aufgetaucht. Es ist unmöglich eine fehlerfreie Software zu schreiben.  Wir würden uns freuen, wenn sie sich die Mühe machen uns diesen Fehler zu melden. Damit unterstützen Sie unser Projekt. Bitte schicken Sie eine E-Mail an ')+
		'<a href="mailto:'+mailadr+'?subject='+escape(subject)+'&body='+escape(msg)+'">'+mailadr+'</a> '+
		gt('oder (wenn Sie sich gut mit Computern auskennen) erstellen Sie einen ')+
		'<a href="'+githubUrl+'" target="_blank">'+gt('Github-Issue')+'</a>. '+gt('Bitte erwähnen Sie folgende Details (gerne noch mehr):')+'<br/><b>Betreff: </b>'+subject+'<br/><textarea id="errtxt" style="width:100%; height:130px;">'+subject+' '+msg+'</textarea></br>'+gt('Vielen Dank!'),
	    'buttons': buttons,
             onshown: function(dialogRef){
                dialogRef.getModalBody().find('#errtxt').text(subject+"\n"+msg);
	    }
        });
	return dialog;
    }
    return getDialog;
});

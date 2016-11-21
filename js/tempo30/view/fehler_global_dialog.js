define('tempo30/view/fehler_global_dialog', [
    'jquery',
    'tempo30/model/version',
    'bootstrap',
    'bootstrap-dialog',
    'gettext!tempo30', 
], function ($, version, bootstrap, BootstrapDialog, gt) {

    'use strict';

    var mailadr='adfcmap-fehler-2016@sven.anders.hamburg';
    var githubUrl='https://github.com/tabacha/adfc-tempo30/issues/new';
    function getDialog(subject, msg, title, startmsg) {
        subject = '('+version.revision+') '+subject;
        msg = msg+' Version:'+version.revision;
	var buttons=[
            {
                id: 'btn-mail',
                label:'Mail an '+mailadr,
                cssClass: 'btn-diabled',
            },
            {
                id: 'github',
                label: 'GitHub-Issue',
                cssClass: 'btn-info',
                action: function (dialogRef) {
                    window.open(githubUrl, '_blank');
                }
            },
	    {
		id: 'cancel-btn',
		label: gt('schließen'),
		cssClass: 'btn-default',
		action: function (dialogRef) {
		    dialogRef.close();
		}
	    }];

	var dialog = new BootstrapDialog({
	    'type': BootstrapDialog.TYPE_WARNING,
	    'title': title,
	    'message':  startmsg+' '+gt('Bitte schicken Sie eine E-Mail oder (wenn Sie sich gut mit Computern auskennen) erstellen Sie einen Github-Issue.')+gt('Bitte erwähnen Sie folgende Details (gerne noch mehr):')+'<br/><b>Betreff: </b>'+subject+'<br/><textarea id="errtxt" style="width:100%; height:130px;" readonly>'+msg+'</textarea></br>'+gt('Vielen Dank!'),
	    'buttons': buttons,
             onshown: function(dialogRef){
                 dialogRef.getModalBody().find('#errtxt').text(msg);
                 $(dialogRef.getButton('btn-mail')).replaceWith(
                     $('<a class="btn btn-primary">').prop("href", "mailto:"+mailadr+'?subject='+escape(subject)+'&body='+escape(msg))
                         .text('Mail an '+mailadr));
	    }
        });
	return dialog;
    }
    return getDialog;
});

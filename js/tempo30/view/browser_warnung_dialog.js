define('tempo30/view/browser_warnung_dialog', [
    'jquery',
    'bootstrap',
    'bootstrap-dialog',
    'gettext!tempo30', 
], function ($, bootstrap, BootstrapDialog, gt) {

    'use strict';

    function getDialog(data, cbNext, cbCancel, title, msg, btnTitle) {
	var buttons=[
	    {
		id: 'back-btn',
		label: btnTitle,
		title: btnTitle,
		cssClass: 'btn-default',
		action: function (dialogRef) {
		    dialogRef.close();
                    data.askFeedback=true;
		    cbNext(data);
		}
	    },
	    {
		id: 'cancel-btn',
		label: gt('Abbruch'),
		cssClass: 'btn-default',
		action: function (dialogRef) {
		    dialogRef.close();
		    cbCancel(data);
		}
	    }];

	var dialog = new BootstrapDialog({
	    'type': BootstrapDialog.TYPE_WARNING,
	    'title': title,
	    'message': msg,
	    'buttons': buttons,
        });
	return dialog;
    }
    function iosDialog(data, cbNext, cbCancel) {
        return getDialog(data, cbNext, cbCancel,
                         'Unter IOS funktioniert dieses Antragswerkzeug nicht.',
                         'Unter IOS funktioniert dieses Antragswerkzeug nicht. Verwenden Sie bitte einen '+
                         'Computer z.B. mit Mac OS und Firefox oder einen Windows/Linux Rechner mit Chrome oder Firefox.',
                         'trotzdem probieren'
                        );
    }
    
    function safariDialog(data, cbNext, cbCancel) {
        return getDialog(data, cbNext, cbCancel,
                         'Unter Safari funktioniert dieses Antragswerkzeug nicht.',
                         'Unter Safari mit MacOS funktioniert dieses Antragswerkzeug nicht. Verwenden '+
                         'Sie bitte z. B. mit Firefox oder Chrome.',
                         'trotzdem probieren'
                        );
    }
    
    function unknownDialog(data, cbNext, cbCancel) {
        return getDialog(data, cbNext, cbCancel,
                         'Ungetesteter Browser',
                         'Sie verwenden einen von uns nicht getesteten Browser. Wir können nicht sicher '+
                         'sagen, ob er funktioniert.\n'+
                         'Sicher funktionieren ein aktueller Firefox oder Chrome unter: Windows, Linux und MacOS.\n'+
                         'Sie können uns helfen und Ihren Browser testen und uns im Anschluß das Ergebniss zussenden.\n'+
                         'Bitte erwähnen Sie dabei folgenden Browser-Identifkations-String\n<pre readonly>'+
                         navigator.userAgent+'</pre>',
                        'ich probiere es aus');
    }
                         
    return {
        ios: iosDialog,
        safari: safariDialog,
        unknown: unknownDialog,
    };
    
});

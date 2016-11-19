define('tempo30/view/fehler_melden_dialog', [
    'tempo30/view/fehler_global_dialog',
    'gettext!tempo30', 
], function (globalDialog, gt) {

    'use strict';

    function getDialog(subject, msg) {
	return globalDialog(
            subject,
            msg,
            gt('Fehler melden'),
            gt('Vielen Dank dass sie sich die Mühe machen uns einen Fehler zu melden.')
        );
    }
    return getDialog;
});

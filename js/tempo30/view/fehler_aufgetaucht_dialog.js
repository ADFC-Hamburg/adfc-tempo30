define('tempo30/view/fehler_aufgetaucht_dialog', [
   'tempo30/view/fehler_global_dialog',
    'gettext!tempo30', 
], function (globalDialog, gt) {

    'use strict';

    var mailadr='adfcmap-fehler-2016@sven.anders.hamburg';
    var githubUrl='https://github.com/tabacha/adfc-tempo30/issues/new';
    function getDialog(subject, msg) {
        return globalDialog(
            subject,
            msg,
            gt('Fehler aufgetreten'),
	    gt('Ups, leider ist ein Fehler aufgetaucht. Es ist unmöglich eine fehlerfreie Software zu schreiben.  Wir würden uns freuen, wenn sie sich die Mühe machen uns diesen Fehler zu melden.')
        );
    }
    return getDialog;
});

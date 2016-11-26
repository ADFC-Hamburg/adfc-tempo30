define('tempo30/app/antragEdit', [
    'jquery',
    'tempo30/view/antragEditView',
    'tempo30/view/fehler_melden_dialog',
    'tempo30/view/fehler_aufgetaucht_dialog',
    //
    'bootstrap',
], function ($, antragEditView) {

    'use strict';

    function start() {
        antragEditView().replaceAll('h6:first');
    }
    return start;

});

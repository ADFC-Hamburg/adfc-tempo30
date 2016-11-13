define('tempo30/app/tracking', [
    'jquery',
    'tempo30/model/version'
], function ($, version) {

    'use strict';

    var url="https://tools.adfc-hamburg.de/tempo30-backend/master/track.php?";
    var first=0;
    function track(data, step) {
        debugger;
        if (data.tracking === 0) {
            return;
        }
        if (first != data.tracking) {
            first= data.tracking;
            $.get(url, {
                id: data.tracking,
                url: window.location.toString(),
                rev: version.revision,
                step: step,
            });
        } else {
            $.get(url, {
                id: data.tracking,
                step: step,
            });

        }
    };
    return track;
});

define('tempo30/view/layer/luft-no2', [
    'leaflet',
    'tempo30/view/layer/t30tmsurl',
], function (L, mapurl) {

    'use strict';

    var layer = L.tileLayer(mapurl, {
	layers: 'luft-no2',
	attribution: "Luftdaten: https://fragdenstaat.de/a/17206"
    });
    return layer;
});

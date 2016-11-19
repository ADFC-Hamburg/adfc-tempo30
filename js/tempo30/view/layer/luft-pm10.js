define('tempo30/view/layer/luft-pm10', [
    'leaflet',
    'tempo30/view/layer/t30tmsurl',
], function (L, mapurl) {

    'use strict';

    var layer = L.tileLayer(mapurl.base, {
	layers: 'luft-pm10',
	attribution: "Luftdaten: https://fragdenstaat.de/a/17206",
        subdomains: mapurl.subdomains,
    });
    return layer;
});

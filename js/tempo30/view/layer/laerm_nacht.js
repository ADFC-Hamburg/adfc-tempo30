define('tempo30/view/layer/laerm_nacht', [
    'leaflet',
    'tempo30/view/layer/t30tmsurl',
    'tempo30/view/layer/bounds'
], function (L, mapurl, bounds) {

    'use strict';

    var layer = L.tileLayer(mapurl.base, {
	layers: 'Laerm_2012_Nacht',
	attribution: "Laermkarten Hamburg © Datenlizenz Deutschland Namensnennung 2.0",
        subdomains: mapurl.subdomains,
        bounds: bounds.bounds,
        minZoom: bounds.minZoom,
    });
    return layer;
});

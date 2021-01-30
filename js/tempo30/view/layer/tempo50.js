define('tempo30/view/layer/tempo50', [
    'leaflet',
    'tempo30/view/layer/t30tmsurl',
    'tempo30/view/layer/bounds'
], function (L, mapurl, bounds) {

    'use strict';

    var layer = L.tileLayer(mapurl.base, {
        layers: 'osm-roads',
        attribution: "Tempo50 Daten: Openstreetmap (ODbl)",
        subdomains: mapurl.subdomains,
        bounds: bounds.bounds,
        minZoom: bounds.minZoom,
    });
    return layer;
});

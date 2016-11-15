define('tempo30/view/layer/tempo50', [
  'leaflet',
  'tempo30/view/layer/t30tmsurl'
], function (L, mapurl) {

    'use strict';

    var layer = L.tileLayer(mapurl, {
	layers: 'osm-roads',
	attribution: "Tempo50 Daten: Openstreetmap (ODbl)"
    });
    return layer;
});

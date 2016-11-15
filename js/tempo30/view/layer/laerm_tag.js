define('tempo30/view/layer/laerm_tag', [
    'leaflet',
    'tempo30/view/layer/t30tmsurl',
], function (L, mapurl) {

    'use strict';
    
    var layer = L.tileLayer(mapurl, {
	layers: 'Laerm_2012_Tag',
	attribution: "Laermkarten Hamburg © Datenlizenz Deutschland Namensnennung 2.0"
    });
    return layer;
});

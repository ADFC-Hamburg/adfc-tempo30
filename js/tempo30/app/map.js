define('tempo30/app/map', [
    'tempo30/view/map',
    'tempo30/view/layer/laerm_tag',
    'tempo30/view/layer/laerm_nacht',
    'tempo30/view/layer/tempo50',
    'tempo30/view/layer/osm-points',
], function (map, laermTag, laermNacht, tempoF, osmPoints) {
 
    'use strict';

    tempoF.addTo(map);
    laermTag.addTo(map);
    laermNacht.addTo(map);
    osmPoints.addTo(map);

    var overlayMaps = {
	"Tempobegrenzungen": tempoF,
	"Lärm Tag": laermTag,
	"Lärm Nacht": laermNacht,
	"POI": osmPoints,
    };
    L.control.layers(null, overlayMaps).addTo(map);
});

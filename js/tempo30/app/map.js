define('tempo30/app/map', [
    'jquery', // jquery muss hier geladen werden, sonnst funktioniert die lat/lon uebergabe in der url nicht.
    'tempo30/view/map',
    'gettext!tempo30',
    'tempo30/view/layer/laerm_tag',
    'tempo30/view/layer/laerm_nacht',
    'tempo30/view/layer/tempo50',
    'tempo30/view/layer/osm-points-offline',
    'tempo30/view/layer/luft-no2',
    'tempo30/view/layer/luft-pm10',
    'tempo30/view/layer/luft-pm25',
    'tempo30/view/layer/tempo30-antraege',
], function ($, map, gt, laermTag, laermNacht, tempoF, osmPoints, luftNo2, luftPm10, luftPm25, antraege) {
 
    'use strict';

//    tempoF.addTo(map);
//    laermTag.addTo(map);
//    laermNacht.addTo(map);
//    osmPoints.addTo(map);
    antraege.addTo(map);

    var overlayMaps = {
	'Tempobegrenzungen': tempoF,
	'Lärm Tag': laermTag,
	'Lärm Nacht': laermNacht,
	'POI': osmPoints,
	'Stickstoffdioxid NO<sub>2</sub>': luftNo2,
	'Feinstaub PM<sub>10</sub>': luftPm10,
	'Feinstaub PM<sub>2.5</sub>': luftPm25,
        'Anträge': antraege,
    };
    L.control.layers(null, overlayMaps).addTo(map);

    return map;    

});

define('tempo30/app/map', [
    'jquery', // jquery muss hier geladen werden, sonnst funktioniert die lat/lon uebergabe in der url nicht.
    'tempo30/view/map',
    'gettext!tempo30',
    'tempo30/view/antragButton',
    'tempo30/app/antrag',
    'tempo30/view/layer/laerm_tag',
    'tempo30/view/layer/laerm_nacht',
    'tempo30/view/layer/tempo50',
    'tempo30/view/layer/osm-points-offline',
    'tempo30/view/layer/luft-no2',
    'tempo30/view/layer/luft-pm10',
    'tempo30/view/layer/luft-pm25',
], function ($, map, gt, AntragButton, startAntrag, laermTag, laermNacht, tempoF, osmPoints, luftNo2, luftPm10, luftPm25) {
 
    'use strict';

    tempoF.addTo(map);
//    laermTag.addTo(map);
//    laermNacht.addTo(map);
    osmPoints.addTo(map);

    var btn = new AntragButton({onClick: function () {startAntrag();}});

    btn.addTo(map);
    
    var overlayMaps = {
	'Tempobegrenzungen': tempoF,
	'Lärm Tag': laermTag,
	'Lärm Nacht': laermNacht,
	'POI': osmPoints,
	'Luft NO2': luftNo2,
	'Luft PM-10': luftPm10,
	'Luft PM-2.5': luftPm25,
    };
    L.control.layers(null, overlayMaps).addTo(map);
    


});

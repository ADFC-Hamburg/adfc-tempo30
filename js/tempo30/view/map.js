define('tempo30/view/map', [
    'jquery',
    'leaflet',
    'tempo30/view/layer/osm_base',
    'gettext!tempo30',
    // not in function:
    'leaflethash'
], function ($, L, basemap, gt) {
 
    'use strict';

    var map = new L.Map('map', {
                                zoom: 11, 
				center: [ 53.56, 10.02],
                                maxZoom: 18, 
                                zoomControl: false,
                                layers: [basemap], 
                                attributionControl: true});
    new L.Hash(map);
    map.zoomControl = new L.Control.Zoom({
        zoomInTitle: gt('Zoom in'),
        zoomOutTitle: gt('Zoom out'),
    });

    map.addControl(map.zoomControl);
    
//    $('#aboutMap').click( aboutDialog.show);

    return map;


});
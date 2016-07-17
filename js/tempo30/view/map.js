define('tempo30/view/map', [
    'jquery',
    'leaflet',
    'tempo30/view/layer/osm_base',
    'gettext!tempo30',
    // not in function:
    'leaflethash'
], function ($, L, basemap, gt) {
 
    'use strict';

  var maxZoom = 18,
    center = new L.LatLng(0, 0);
    var map = new L.Map('map', {center: center, 
                                zoom: 2, 
                                maxZoom: maxZoom, 
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
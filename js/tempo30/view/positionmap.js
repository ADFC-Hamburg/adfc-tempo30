define('tempo30/view/positionmap', [
    'jquery',
    'leaflet',
    'tempo30/view/layer/osm_base',
    'gettext!tempo30',
    // not in function:
    'leaflethash'
], function ($, L, basemap, gt) {
 
    'use strict';

    function createMap(id,lat,lon) {
	var map = new L.Map(id, {
            zoom: 17, 
            center: [ lat, lon],
            maxZoom: 18, 
            zoomControl: false,
            layers: [basemap()], 
            attributionControl: true});

	var circle = L.circle([lat, lon], 10, {
	    color: 'red',
	    fillColor: '#f03',
	    fillOpacity: 0.5
	}).addTo(map);

	map.zoomControl = new L.Control.Zoom({
            zoomInTitle: gt('Zoom in'),
            zoomOutTitle: gt('Zoom out'),
	});
	map.addControl(map.zoomControl);
	map.on('click', function (e) {
	    circle.setLatLng(e.latlng);
	    map.fireEvent('posChange', e.latlng);
	});
	return map;

    }

    return createMap;

});

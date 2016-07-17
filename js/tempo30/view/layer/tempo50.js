define('tempo30/view/layer/tempo50', [
  'leaflet',
], function (L) {

    'use strict';

    //var layer = L.tileLayer.wms("http://geodienste.hamburg.de/HH_WMS_Strassenverkehr?zufall=0.21", {
    var layer = L.tileLayer.wms("https://anders.hamburg/cgi-bin/map-tempo30", {
	layers: 'osm-roads',
	format: 'image/png',
	crs: L.CRS.EPS4326,
	transparent: true,
	attribution: "Openstreetmap"
    });
    layer.options.crs = L.CRS.EPSG4326;
    return layer;
});
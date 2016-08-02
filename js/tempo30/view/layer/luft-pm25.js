define('tempo30/view/layer/luft-pm25', [
  'leaflet',
], function (L) {

    'use strict';

    //var layer = L.tileLayer.wms("http://geodienste.hamburg.de/HH_WMS_Strassenverkehr?zufall=0.21", {
    var layer = L.tileLayer.wms("https://anders.hamburg/cgi-bin/map-tempo30", {
	layers: 'luft-pm25',
	format: 'image/png',
	crs: L.CRS.EPS4326,
	transparent: true,
	attribution: "Luftdaten: https://fragdenstaat.de/a/17206"
    });
    layer.options.crs = L.CRS.EPSG4326;
    return layer;
});
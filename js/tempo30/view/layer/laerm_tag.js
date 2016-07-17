define('tempo30/view/layer/laerm_tag', [
  'leaflet',
], function (L) {

    'use strict';
    
    //var layer = L.tileLayer.wms("http://geodienste.hamburg.de/HH_WMS_Strassenverkehr?zufall=0.21", {
// Alternativ: https://anders.hamburg/cgi-bin/map-tempo30?mode=tile&layers=Laerm_2012_Tag&tilemode=gmap&tile=69159+42364+17
    var layer = L.tileLayer.wms("https://anders.hamburg/cgi-bin/map-tempo30", {
	layers: 'Laerm_2012_Tag',
	format: 'image/png',
	crs: L.CRS.EPS4326,
	transparent: true,
	attribution: "Laermkarten Hamburg © Datenlizenz Deutschland Namensnennung 2.0"
    });
    layer.options.crs = L.CRS.EPSG4326;
    return layer;
});
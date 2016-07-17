define('tempo30/view/layer/osm_base', [
  'leaflet',
  'gettext!tempo30',
], function (L, gt) {

    'use strict';
    
    var 
    maxZoom = 18,
    baseUrl = '//{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
    baseAttribution = gt('Map &copy; %1$s. (%2$s)', '<a href="http://openstreetmap.org">OpenStreetMap</a>', '<a href="http://opendatacommons.org/licenses/odbl/">ODbL</a>')+
        ' | <a href="#" id="aboutMap">'+
        gt('about this map')+
        '</a>' ,
    subdomains = 'abc',
    layer = new L.TileLayer(baseUrl, {maxZoom: maxZoom, attribution: baseAttribution, subdomains: subdomains});
    return layer;
});
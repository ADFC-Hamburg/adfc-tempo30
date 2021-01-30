define('tempo30/view/layer/osm-points', [
    'tempo30/view/model/osm-points-tags',
    'leaflet',
    'leaflet-layer-overpass'
], function (osmTags, L) {

    'use strict';

    var query= '(';
    for (var i = 0; i < osmTags.length; i++) {
        query=query+'node["'+osmTags[i].k+'"="'+osmTags[i].v+'"](BBOX);';
        query=query+'way["'+osmTags[i].k+'"="'+osmTags[i].v+'"](BBOX);';
    }
    query= query+ '); out tags center;';

    console.log(query);
    var opl = new L.OverPassLayer({
        endpoint: "https://overpass-api.de/api/",
        query: query,
        minzoom: 17,
        callback: function(data) {
            for(var i=0;i<data.elements.length;i++) {
                var e = data.elements[i];
                if (e.id in this.instance._ids) return;
                this.instance._ids[e.id] = true;
                var pos;
                var txt='unbekannt';
                var color='red';
                for (var t = 0; t < osmTags.length; t++) {
                    if (e.tags[osmTags[t].k] === osmTags[t].v) {
                        txt=osmTags[t].t;
                        color=osmTags[t].c;
                    }   
                }

                if (e.lat) {
                    pos = new L.LatLng(e.lat, e.lon);
                } else {
                    pos = new L.LatLng(e.center.lat, e.center.lon);
                }
                var popup;
                if (e.tags.name) {
                    popup='<div>'+e.tags.name+' ('+txt+')</div>';
                } else {
                    popup='<div>'+txt+'</div>';
                }
                var circle = L.circle(pos, 50, {
                    color: color,
                    fillColor: '#fa3',
                    fillOpacity: 0.5
                })
                    .bindPopup(popup);
                this.instance.addLayer(circle);
            }
        },
        minZoomIndicatorOptions: {
            position: 'topright',
            minZoomMessageNoLayer: "no layer assigned",
            minZoomMessage: "Bitte zoomen Sie in die Karte um die POIs zu sehen"
        }
    });
    return opl;
});
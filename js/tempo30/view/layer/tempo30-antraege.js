define('tempo30/view/layer/tempo30-antraege', [
    'jquery',
    'leaflet',
    'gettext!tempo30',
    'tempo30/model/osm-points-tags',
    'leaflet-layer-overpass',
], function ($, L, gt, osmTags) {

    'use strict';

    var endpoint= 'https://overpass-api.de/api/';
    var loadingDiv=$('<div class="osmLoading">').text(gt('Loading OpenStreetMap POIs, please wait (this will take normaly 30 seconds) ...'));

    var query= '[out:json][timeout:60];(';
    var url='https://tools.adfc-hamburg.de/tempo30-backend/master/antragsmap.php',
        request = new XMLHttpRequest();

    //    url = requirejs.toUrl('d');

    request.open("GET", url, true);
    var opl = new L.FeatureGroup([]);

    request.onload = function() {
        if (this.status === 200) {
            var reference = {instance: self};
            var data=JSON.parse(this.response);
            for(var i=0;i<data.length;i++) {
                var e = data[i];
                var color='blue';
                var status='Antragstools benutzt';
                if (e.status==='1') {
                    color='green';
                    status='Antrag wird doch nicht mehr gestellt';
                }
                if (e.status==='2') {
                    color='red';
                    status='Antrag bei Behörde gestellt';
                }
                var pos = new L.LatLng(e.lat, e.lon);
                var popup;
                popup='<div>Nr. '+e.id+'<br>'+status+'</div>';
                var circle = L.circle(pos, 50, {
                    color: color,
                    fillColor: color,
                    fillOpacity: 0.4
                }).bindPopup(popup);
                opl.addLayer(circle);
            }
            //          loadingDiv.remove();
        } else {
        }
    };
    request.onreadystatechange = function()
    {
        if ((this.readyState === 4) && (this.status != 200)){
            alert('Error loading OSM Pois'+ request.statusText);
            //          loadingDiv.remove();
        }
    };
    //    $('body').append(loadingDiv);
    request.send('data=' + query);
    return opl;
});

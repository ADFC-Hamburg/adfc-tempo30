define('tempo30/view/layer/osm-points-offline', [
    'leaflet',
    'gettext!tempo30',
    'tempo30/model/osm-points-tags',
    'leaflet-layer-overpass',
], function (L, gt, osmTags) {
   
    'use strict';

    var endpoint= 'https://overpass-api.de/api/';
    var loadingDiv=$('<div class="osmLoading">').text(gt('Loading OpenStreetMap POIs, please wait (this will take normaly 30 seconds) ...'));
    
    var query= '[out:json][timeout:60];(';
/*    for (var i = 0; i < osmTags.length; i++) {
	query=query+'node["'+osmTags[i].k+'"="'+osmTags[i].v+'"](BBOX);';
	query=query+'way["'+osmTags[i].k+'"="'+osmTags[i].v+'"](BBOX);';
    }
    query = query+ ');out tags center;';
    query = query.replace(new RegExp('BBOX','g'),'53.40912254769818,9.741439819335938,53.72962293149973,10.224151611328125');
    console.log(query);
//'https://anders.hamburg/adfc/tempo30/osm-poi.json',*/
    var url= endpoint + 'interpreter',
        request = new XMLHttpRequest();

    url = "data/osm-poi.json";

    request.open("POST", url, true);
    request.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    var opl = new L.FeatureGroup([]);

    request.onload = function() {
        if (this.status === 200) {
            var reference = {instance: self};
	    var data=JSON.parse(this.response);
            for(var i=0;i<data.elements.length;i++) {
		var e = data.elements[i];
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
		}).bindPopup(popup);
		opl.addLayer(circle);
            }
	    loadingDiv.remove();
        } else {
	}
    };
    request.onreadystatechange = function()
    {
	if ((this.readyState === 4) && (this.status != 200)){
	    alert('Error loading OSM Pois'+ request.statusText);
	    loadingDiv.remove();
	}
    };
    $('body').append(loadingDiv);
    request.send('data=' + query);
    return opl;
});
define('tempo30/app/update-overpass', [
    'rsvp',
    'fs', 
    'request', 
    'text!tempo30/overpass/strassenliste.txt',
    'text!tempo30/overpass/strassenliste-test.txt',
    'tempo30/model/osm-points-tags',
], function (RSVP, fs, request, opStrassen, opStrassenTest, osmTags) {

    'use strict';

    var baseurl='http://overpass-api.de/api/interpreter';
    var strassenFile='data/strassenliste.json';
    var osmPoiFile='data/osm-poi.json';

    function getOverpassResult(data) {
	return new RSVP.Promise(function(resolve, reject){
            var url = baseurl + '?data=' + 
		encodeURIComponent(data);
            console.log(url);
            request(url, function (error, response, content) {
		if (!error && response.statusCode == 200) {
                    resolve(content);
		} else {
		    reject(error,response);
		}
	    });
	});
    }

    function getOSMPoiOverpassQuery() {
	var query= '[out:json][timeout:60];(';
	for (var i = 0; i < osmTags.length; i++) {
	    query=query+'node["'+osmTags[i].k+'"="'+osmTags[i].v+'"](BBOX);';
	    query=query+'way["'+osmTags[i].k+'"="'+osmTags[i].v+'"](BBOX);';
	}
	query = query+ ');out tags center;';
	query = query.replace(new RegExp('BBOX','g'),'53.40912254769818,9.741439819335938,53.72962293149973,10.224151611328125');
	return query;
    }

    function saveStrListenResult(testmode, o)  {
	var arr=o.split(/\r?\n/).sort();
	var ret = [arr[0]];
	for (var i = 1; i < arr.length; i++) { // start loop at 1 as element 0 can never be a duplicate
	    if (arr[i-1] !== arr[i]) {
		ret.push(arr[i]);
	    }
	}
	console.log(ret);
	var outStr;
        if (testmode) {
            outStr=JSON.stringify(ret, null, 2);
        } else {
            outStr=JSON.stringify(ret);
        }
        fs.writeFile(strassenFile, outStr, function(error) {
            if(error) {
                err(error);
                return;
            }
            console.log('The Street File was saved!');
        });
    }

    function saveOsmPoi(outStr) {
	fs.writeFile(osmPoiFile, outStr, function(error) {
            if(error) {
                err(error);
                return;
            }
            console.log('The OSM-POI File was saved!');
        });
    }

    return function(testmode, done, err) {

	getOverpassResult(getOSMPoiOverpassQuery()).then(function (o) {
	    saveOsmPoi(o);
	    var opQuery;
	    if (testmode) {
		opQuery = opStrassenTest;
	    } else {
		opQuery = opStrassen;
	    }
	    console.log('Asking for Strassenliste', opQuery);
	    
	    getOverpassResult(opQuery).then(function (o) {
		saveStrListenResult(testmode, o);
		done();
	    }).catch(function(reason){
		console.log('err',reason);
		err();
	    });
	}).catch(function(reason){
	    console.log('err',reason);
	    err();
	});

    };

});
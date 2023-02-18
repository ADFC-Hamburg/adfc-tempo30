define('tempo30/app/update-overpass', [
    'rsvp',
    'fs', 
    'request', 
    'text!tempo30/overpass/strassenliste.overpassql',
    'text!tempo30/overpass/strassenliste-test.overpassql',
    'tempo30/model/osm-points-tags',
], function (RSVP, fs, request, opStrassen, opStrassenTest, osmTags) {

    'use strict';

    var baseurl='http://overpass-api.de/api/interpreter';
    var strassenFile='/tmp/tempo30-strassenliste.json';
    var osmPoiFile='/tmp/tempo30-osm-poi.json';
    var dataStrassenFile='data/strassenliste.json';
    var dataOsmPoiFile='data/osm-poi.json';
    var refreshTime= 20*60*60;

    // create_action is only executed if file is older than a time or it does not exists
    function fileIsOlderOrNotExists(file, time_in_sec, create_action) {
        return new RSVP.Promise(function(resolve, reject){
            fs.stat(file, function(err, stat) {
                if(err === null) {
                    var mstamp = new Date(stat.mtime).getTime() / 1000;
                    var now = new Date().getTime() / 1000;
                    if (time_in_sec < (now-mstamp)) {
                        create_action().then(resolve);
                    } else {
                        console.log('skipping new creation of '+file);
                        resolve();
                    }
                } else if(err.code == 'ENOENT') {
                    // file does not exist
                    create_action().then(resolve).catch(err);
                } else {
                    reject(err);
                }
            });
        });
    }

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

    function saveStrListenResult(testmode, o, cb, cbErr)  {
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
                cbErr(error);
                return;
            }
            console.log('The Street File was saved!');
            cb();
        });
    }

    function saveOsmPoi(outStr, cb, errcb) {
        fs.writeFile(osmPoiFile, outStr, function(error) {
            if(error) {
                errcb(error);
                return;
            }
            console.log('The OSM-POI File was saved!');
            cb();
        });
    }

    function copyFile(source, target, cb) {
        var cbCalled = false;

        var rd = fs.createReadStream(source);
        rd.on("error", function(err) {
            done(err);
        });
        var wr = fs.createWriteStream(target);
        wr.on("error", function(err) {
            done(err);
        });
        wr.on("close", function(ex) {
            done();
        });
        rd.pipe(wr);

        function done(err) {
            console.log('copied '+source+' to '+target);
            if (!cbCalled) {
                cb(err);
                cbCalled = true;
            }
        }
    }
    return function(testmode, done, err) {
        fileIsOlderOrNotExists(osmPoiFile, refreshTime, function () {
            return new RSVP.Promise(function(resolve, reject){
                getOverpassResult(getOSMPoiOverpassQuery()).then(function (o) {
                    saveOsmPoi(o, resolve, reject);
                });
            });
        }).then(function () {
            copyFile(osmPoiFile, dataOsmPoiFile, function () {
                fileIsOlderOrNotExists(strassenFile, refreshTime, function () {
                    return new RSVP.Promise(function(resolve, reject){
                        var opQuery;
                        if (testmode) {
                            opQuery = opStrassenTest;
                        } else {
                            opQuery = opStrassen;
                        }
                        console.log('Asking for Strassenliste', opQuery);
                        return getOverpassResult(opQuery).then(function (o) {
                            saveStrListenResult(testmode, o, resolve, reject);
                        });
                    });

                }).then( function() {
                    copyFile(strassenFile, dataStrassenFile, function () {
                        done();
                    });
                }).catch(function(reason){
                    console.log('err',reason);
                    err();
                });
            });
        }).catch(function(reason){
            console.log('err',reason);
            err();
        });

    };

});

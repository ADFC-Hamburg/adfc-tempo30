define('tempo30/model/overpassUtil', [
], function () {

    function getOverpassResult(query) {
	var baseurl='https://overpass-api.de/api/interpreter';
	var url = baseurl + '?data=' + encodeURIComponent(query);
        return $.ajax({
	    'url':url,
	    'dataType':'json'
	});
    }

    function replaceBBox(query, bbox) {
	return query.replace(new RegExp('{{bbox}}','g'), bbox);
    }
    return {
	'getResult': getOverpassResult,
	'replaceBBox': replaceBBox,
    };
});
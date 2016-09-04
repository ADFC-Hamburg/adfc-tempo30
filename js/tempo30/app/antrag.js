define('tempo30/app/antrag', [
    'jquery',
    'tempo30/model/version',
], function ($, version) {

    function nominatimSearch(str, nr) {
	var baseUrl='https://nominatim.openstreetmap.org/search';
	var baseParam='?format=json&city=Hamburg&countrycodes=de&limit=1&accept-language=de&email=adfc-2016@sven.anders.hamburg';
	var query=nr+" "+str;
	var url= baseUrl + baseParam + '&street='+encodeURIComponent(query);
	return $.ajax({
	    'url': url,
	    'dataType':'json'
	});
    }
    
    function step2(data) {
	console.log(data);
	nominatimSearch(data.str, data.hausnr).done(function (d) {
	    console.log(d);
	    data.lat=d[0].lat;
	    data.lon=d[0].lon;
	    require(['tempo30/view/position_dialog'], function(createDialog) {
		createDialog(data, step1, step3).open();
	    });
	}).fail(function (e) {
	    console.error(e);
	    alert('Fehler');
	});
    }
    function step3(data) {
	require(['tempo30/view/str_wahl_dialog'], function(createDialog) {
	    createDialog(data, step2, step4, strNotFound).open();
	});
    }
    function step4(data) {
	console.log(data);
	alert('Not implemented yet');
    }
    function strNotFound(data) {
	require(['tempo30/view/str_not_found_dialog'], function(createDialog) {
	    createDialog(data, step2, function () {}, errorStrNotFound).open();
	});
    }
    function errorDialog(subject, msg) {
	require(['tempo30/view/fehler_melden_dialog'], function(createDialog) {
	    createDialog(subject, msg).open();
	});
    }
    function errorStrNotFound(data) {
	errorDialog('Tempo 50 Str. nicht gefunden ('+data.lat+' '+data.lon+')','lat='+data.lat+' lon='+data.lon+' version='+version.revision+'('+version.date+')'+"\n"+data.str+data.hausnr);
    }
    function step1() {
	require(['tempo30/view/ortssuche_dialog'], function(createDialog) {
	    var dialog=createDialog(step2);
	    dialog.open();
	});
    }

    return step1;
});
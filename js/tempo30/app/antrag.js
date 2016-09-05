define('tempo30/app/antrag', [
    'jquery',
    'tempo30/model/version',
    'tempo30/view/ortssuche_dialog',
    'tempo30/view/position_dialog',
    'tempo30/view/str_wahl_dialog',
    'tempo30/view/str_not_found_dialog',
    'tempo30/view/fehler_melden_dialog',
], function ($, version, step1dialog, step2dialog, step3dialog, strNfDialog, errorDialog) {

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

    function step1() {
	step1dialog(step2).open();
    }
    
    function step2(data) {
	console.log(data);
	nominatimSearch(data.str, data.hausnr).done(function (d) {
	    console.log(d);
	    data.lat=d[0].lat;
	    data.lon=d[0].lon;
	    step2dialog(data, step1, step3).open();
	}).fail(function (e) {
	    console.error(e);
	    alert('Fehler');
	});
    }
    function step3(data) {
	step3dialog(data, step2, step4, strNotFound).open();
    }
    function step4(data) {
	console.log(data);
	alert('Not implemented yet');
    }
    function strNotFound(data) {
	strNfDialog(data, step2, function () {}, errorStrNotFound).open();
    }
    function errorStrNotFound(data) {
	errorDialog('Tempo 50 Str. nicht gefunden ('+data.lat+' '+data.lon+')','lat='+data.lat+' lon='+data.lon+' version='+version.revision+'('+version.date+')'+"\n"+data.str+data.hausnr).open();
    }

    return step1;
});
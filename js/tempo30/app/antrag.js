define('tempo30/app/antrag', [
    'jquery',
    'tempo30/model/version',
    'tempo30/view/ortssuche_dialog',
    'tempo30/view/position_dialog',
    'tempo30/view/str_wahl_dialog',
    'tempo30/view/str_not_found_dialog',
    'tempo30/view/fehler_melden_dialog',
    'tempo30/view/download_dialog',
], function ($, version, step1dialog, step2dialog, step3dialog, strNfDialog, errorDialog, step4dialog) {

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
	    // FIXME
	    alert('Fehler');
	});
    }
    function step3(data) {
	$.ajax({
	    'url': 'https://tools.adfc-hamburg.de/tempo30-backend/geodaten.php?lat='+data.lat+'&lon='+data.lon,
	    'dataType':'json'
	}).done( function (geodata) {
	    data=$.extend(data,geodata);
	    step3dialog(data, step2, step4, strNotFound).open();
	}).fail( function (e) {
	    console.error('error',e);
	    // FIXME
	    alert('Fehler');

	});
    }
    function step4(data) {
	step4dialog(data, step3).open();
    }
    function strNotFound(data) {
	strNfDialog(data, step2, function () {}, errorStrNotFound).open();
    }
    function errorStrNotFound(data) {
	errorDialog('Tempo 50 Str. nicht gefunden ('+data.lat+' '+data.lon+')','lat='+data.lat+' lon='+data.lon+' version='+version.revision+'('+version.date+')'+"\n"+data.str+data.hausnr).open();
    }

    return step1;

//{"str":"Cuxhavener Straße","name":"Max Mustermann","hausnr":"78","plz":"21149","lat":"53.4715402","lon":"9.90065095","antrag":["Waltershofer Straße","Cuxhavener Straße"],polizei:[{"bemerkung":"PK-Grenzen","region":"Harburg","pk":"PK 47","vd":"VD 4","polizeirev":"47","name":"PK47 Neugraben","strasse":"Neugrabener Markt 3","plz":"21149","ort":"Hamburg","tel":"040 428 65-4710"},],ort:[{"bezirk_name":"Harburg","stadtteil":"Hausbruch","ortsteilnummer":"714","bezirk":"7"},],laerm_tag:[{"klasse":"5"},],laerm_nacht:[{"klasse":"5"},],luftdaten:[{"gid":"2183","name_12":"Bundesstrae B73","no2_i1_gb":"30.15055","pm10_i1_gb":"25.4","pm25_i1_gb":"18.7","st_astext":"MULTILINESTRING((9.89456688524801 53.4717257209532,9.89706589630153 53.4716198843808,9.89755441490041 53.4715843238093,9.89812061423444 53.4715334425004,9.89875985895506 53.4714404078619))","st_distance":"4.47805368471465"},]}
});
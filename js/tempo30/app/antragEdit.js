define('tempo30/app/antragEdit', [
    'jquery',
    'tempo30/view/antragEditView',
    'tempo30/view/fehler_melden_dialog',
    'tempo30/view/fehler_aufgetaucht_dialog',
    //
    'bootstrap',
], function ($, antragEditView) {

    'use strict';

function getQueryVariable(variable) {
  var query = window.location.search.substring(1);
  var vars = query.split("&");
  for (var i=0;i<vars.length;i++) {
    var pair = vars[i].split("=");
    if (pair[0] == variable) {
      return pair[1];
    }
  }
  alert('Query Variable ' + variable + ' not found');
}
    function start() {
         var id=getQueryVariable('aid');
         var secret=getQueryVariable('secret');
         var loadFunc= function () {
            return     $.ajax({
                  'url': 'https://tools.adfc-hamburg.de/tempo30-backend/master/get.php',
                  'dataType':'json',
                  data:{
                    id: id,
                    secret: secret,
                  }
              });
         };
         loadFunc().done(function (data) {
          console.log(data);
          if (data===false) {
            alert('Login fehlgeschlagen');
          } else {
            var viewDiv=antragEditView(data);
            viewDiv.replaceAll('h6:first');
            var saveFunc;
            var saveBase;
            var updateFunc = function (updateStatus) {
              var placeHolder=$('<div>').text('Bitte warten...');
              placeHolder.replaceAll(viewDiv);
              loadFunc().done(function (data) {
                console.log(data);
                // Fixme remove This
                data.updateStatus=updateStatus;
                viewDiv = antragEditView(data);
                viewDiv.replaceAll(placeHolder);
                viewDiv.on('save', saveFunc );
                viewDiv.on('save-base', saveBase);
                $('html, body').animate({
                  scrollTop:$(viewDiv).offset().top-10
                },'slow');
              }).fail(function (jqXHR, textStatus) {
                alert('Erneuter Datenabruf fehlgeschlagen, bitte versuchen Sie es später nochmal');
              });
            };
            saveFunc = function (ev, savData) {
              savData.id= id;
              savData.secret = secret;
              $.ajax({
                   'url': 'https://tools.adfc-hamburg.de/tempo30-backend/master/status-update.php',
                   'dataType': 'json',
                   'method': 'POST',
                   'data': savData
               }).done(updateFunc).fail(function (jqXHR, textStatus) {
                 alert('Speichern der Daten fehlgeschlagen, bitte versuchen Sie es später nochmal'+ textStatus);
               });
            };
            saveBase = function (ev, savData) {
              savData.id= id;
              savData.secret = secret;
              var validate= true;
              viewDiv.find('.form-group[for=plz]').removeClass('has-error');
              viewDiv.find('.help-block[for=plz]').text('');
              if ((savData.plz !== '') && (savData.plz.length !== 5)) {
                viewDiv.find('.form-group[for=plz]').addClass('has-error');
                viewDiv.find('.help-block[for=plz]').text('Eine PLZ muss 5 Stellen haben');
                validate=false;
              } else if ((savData.plz.length === 5) &&  (!savData.plz.match(/2\d\d\d\d/))) {
                viewDiv.find('.form-group[for=plz]').addClass('has-error');
                viewDiv.find('.help-block[for=plz]').text('Die PLZ gibt es nicht in Hamburg.');
                    validate=false;
              }
              viewDiv.find('.form-group[for=lat]').removeClass('has-error');
              viewDiv.find('.help-block[for=lat]').text('');
              if ((savData.lat !== '') && (parseFloat(savData.lat) === NaN)) {
                  viewDiv.find('.form-group[for=lat]').addClass('has-error');
              viewDiv.find('.help-block[for=lat]').text('Latitude muss eine Kommazahl sein.');
                  validate=false;
              }
              if (savData.showinmap && (savData.lat === '')) {
                viewDiv.find('.form-group[for=lat]').addClass('has-error');
                viewDiv.find('.help-block[for=lat]').text('Für die Kartenanzeige brauchen wir hier einen Wert');
                    validate=false;
              }
              viewDiv.find('.form-group[for=lon]').removeClass('has-error');
              viewDiv.find('.help-block[for=lon]').text('');
              if ((savData.lon !== '') && (parseFloat(savData.lat) === NaN)) {
                  viewDiv.find('.form-group[for=lon]').addClass('has-error');
              viewDiv.find('.help-block[for=lon]').text('Longitude muss eine Kommazahl sein.');
                  validate=false;
              }
              if (savData.showinmap && (savData.lon === '')) {
                viewDiv.find('.form-group[for=lon]').addClass('has-error');
                viewDiv.find('.help-block[for=lon]').text('Für die Kartenanzeige brauchen wir hier einen Wert');
                    validate=false;
              }
              if ((savData.lon === '') && (savData.lat !== '')) {
                viewDiv.find('.form-group[for=lon]').addClass('has-error');
                viewDiv.find('.help-block[for=lon]').text('Damit wir die Latitude abspeichern können muss auch hier ein Wert stehen.');
                validate=false;
              }
              if ((savData.lat === '') && (savData.lon !== '')) {
                viewDiv.find('.form-group[for=lat]').addClass('has-error');
                viewDiv.find('.help-block[for=lat]').text('Damit wir die Lomgitude abspeichern können muss auch hier ein Wert stehen.');
                validate=false;
              }

              viewDiv.find('button[evt=save-base]').parent().find('.alert').remove();
              if (validate === true) {
                $.ajax({
                     'url': 'https://tools.adfc-hamburg.de/tempo30-backend/test/base-update.php',
                     'dataType': 'json',
                     'method': 'POST',
                     'data': savData
                 }).done(updateFunc).fail(function (jqXHR, textStatus) {
                   alert('Speichern der Daten fehlgeschlagen, bitte versuchen Sie es später nochmal'+ textStatus);
                 });
              } else {
                viewDiv.find('button[evt=save-base]').before(
                  $('<div class="alert alert-danger">')
                  .text(' Bitte behebe die obigen Fehler.')
                  .prepend($('<strong>').text('Speichern nicht möglich')));
              };
              console.log(savData);
            };
            viewDiv.on('save', saveFunc );
            viewDiv.on('save-base', saveBase);
          }
        }).fail(function (jqXHR, textStatus) {
            alert('Datenabruf fehlgeschlagen, bitte versuchen Sie es später nochmal');
        });
    }
    return start;

});

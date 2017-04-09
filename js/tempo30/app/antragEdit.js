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
         var id=getQueryVariable('id');
         var secret=getQueryVariable('secret');
         var loadFunc= function () {
            return     $.ajax({
                  'url': 'https://tools.adfc-hamburg.de/tempo30-backend/test/get.php',
                  'dataType':'json',
                  data:{
                    id: id,
                    secret: secret,
                  }
              });
         }
         loadFunc().done(function (data) {
          console.log(data);
          if (data===false) {
            alert('Login fehlgeschlagen');
          } else {
            var viewDiv=antragEditView(data);
            viewDiv.replaceAll('h6:first');
            var saveFunc = function (ev, savData) {
              savData.id= id;
              savData.secret = secret;
              $.ajax({
                   'url': 'https://tools.adfc-hamburg.de/tempo30-backend/test/status-update.php',
                   'dataType': 'json',
                   'method': 'POST',
                   'data': savData
               }).done(function (updateStatus) {
                 console.log(savData);
                 var placeHolder=$('<div>').text('Bitte warten...');
                 placeHolder.replaceAll(viewDiv);
                 loadFunc().done(function (data) {
                   console.log(data);
                   // Fixme remove This
                   data.updateStatus=updateStatus;
                   viewDiv = antragEditView(data);
                   viewDiv.replaceAll(placeHolder);
                   viewDiv.on('save', saveFunc );
                   debugger;
                   $('html, body').animate({
                     scrollTop:$(viewDiv).offset().top-10
                   },'slow');
                 }).fail(function (jqXHR, textStatus) {
                   alert('Erneuter Datenabruf fehlgeschlagen, bitte versuchen Sie es später nochmal');
                 });
               }).fail(function (jqXHR, textStatus) {
                 alert('Speichern der Daten fehlgeschlagen, bitte versuchen Sie es später nochmal'+ textStatus);
               });
            };
            viewDiv.on('save', saveFunc );
          }
        }).fail(function (jqXHR, textStatus) {
            alert('Datenabruf fehlgeschlagen, bitte versuchen Sie es später nochmal');
        });
    }
    return start;

});

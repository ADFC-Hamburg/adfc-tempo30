define('tempo30/view/antragEditView', [
    'jquery',
    'moment',
    'tempo30/model/version',
    'tempo30/view/fehler_melden_dialog',
    'tempo30/view/fehler_aufgetaucht_dialog',
    'gettext!tempo30',
    'tempo30/model/antragEditLayout',
    //
    'bootstrap',
    'css!lib/bootstrap-datepicker/bootstrap-datepicker3'
], function ($, moment, version, errorMsgDialog, errorOccDialog, gt, layout) {

    'use strtict';

    var saveElements = {
      'datepicker': function (element, section) {
        if (! $("input#"+element.id).is(':visible')) {
          return null;
        }
         var value=$("input#"+element.id).val();
         if (value === '') {
           return null;
         }
         var dateFromatRegEx=/^(\d\d)\.(\d\d)\.(\d\d\d\d)$/;
         if (value) {
           value=value.replace(dateFromatRegEx,'$3-$2-$1');
         }
         return value;
      },
      'checkbox': function (element, section) {
        if (! $("input#"+element.id).is(':visible')) {
          return null;
        }
        return $("input#"+element.id).prop('checked');

      },
      'radio': function (element, section) {
        if (! $("input[name='"+element.id+"']").is(':visible')) {
          return null;
        }
        return $("input[name='"+element.id+"']:checked").val();
      }
    };
    var viewElements= {
        'button': function (element) {
          if (element.subtype=== 'save') {
            var btn=$('<button type="submit" class="btn btn-primary">')
            .text('Speichern');
            btn.click(function () {
              btn.addClass('disabled');
              var data = {};
              var sectionDiv=btn.closest('div.section');
              var container = btn.closest('div.container-fluid');
              $.each(layout, function (index, section) {
                if ('section_'+section.id === sectionDiv.attr('id')) {
                  $.each(section.elements, function (index, element) {
                    var saveFunc=saveElements[element.type];
                    if (typeof(saveFunc) === 'function') {
                      data[element.id] = saveFunc(element, sectionDiv);
                    }
                  });
                }
              });
              container.trigger(element.trigger, data);
              btn.removeClass('disabled');
            });
            return $('<div class="form-group col-sm-12">').append(btn);
          }
          if (element.subtype=== 'delete') {
            return $('<button type="submit" class="btn btn-danger">Meine Daten löschen</button>');
          }
        },
        'checkbox': function (element, value) {
            var c=false;
            if ((value === true) || (value === 't')) {
              c=true;
            }
            var ipt=$('<input type="checkbox">')
              .prop('id', element.id)
              .prop('checked', c);
            if (element.readonly === true) {
              ipt.prop('readonly', true);
              ipt.prop('disabled', true);
            }
            return $('<div class="form-group col-sm-6">').attr('for',element.id).append(
             $('<div class="checkbox">').append(
                $('<label>')
                    .text(element.label)
                    .prepend(ipt))

            );
        },
        'datepicker': function (element, value) {
            var dateFromatRegEx=/^(\d\d\d\d)\-(\d\d)\-(\d\d)$/;
            if (value) {
              value=value.replace(dateFromatRegEx,'$3.$2.$1');
            }
            var input=$('<input type="text" class="form-control datepicker">')
            .prop('id', element.id)
            .prop('value', value );

            input.datepicker({
                language: "de",
                format: "dd.mm.yyyy",
                todayBtn: "linked",
                orientation: "left"
            });
            var formGroup=$('<div class="form-group col-sm-6">').attr('for', element.id);
            var helpBlock=$('<span class="help-block">').attr('for', element.id);
            var isRegisterdNachVal=false;
            var changeFunc= function () {
              console.log(input.val());
              var datumVal=moment(input.val(),"DD.MM.YYYY");
              if (input.val() === '') {
                formGroup.removeClass('has-error');
                helpBlock.text('');
              } else
              if (datumVal.isValid()) {
                if (datumVal.isAfter()) {
                  formGroup.addClass('has-error');
                  helpBlock.text('Termin liegt in der Zukunft');
                } else {
                  if (element.nachId) {
                    var nachValInput=formGroup.parent().find('input#'+element.nachId);
                    console.log(nachValInput);
                    if ((isRegisterdNachVal === false) && (nachValInput.length >0)) {
                      nachValInput.on('change', changeFunc);
                      isRegisterdNachVal = true;
                    }
                    var nachVal=moment(nachValInput.val(), "DD.MM.YYYY");
                    if (nachVal.isValid() && datumVal.isBefore(nachVal)) {
                      formGroup.addClass('has-error');
                      helpBlock.text('Liegt vor dem '+ nachValInput.val() + '!');
                    } else {
                      formGroup.removeClass('has-error');
                      helpBlock.text('');
                    }
                  } else {
                    formGroup.removeClass('has-error');
                    helpBlock.text('');
                  }
                }
              } else {
                formGroup.addClass('has-error');
                helpBlock.text('Falsches Datumsformat');
              }
            };
            input.on('change', changeFunc);

            return formGroup.append($('<label>').attr('for',element.id).text(element.label))
                .append(input)
                .append(helpBlock);


        },
        'text': function (element, value) {
          var ipt=$('<input type="text" class="form-control">')
            .prop('id', element.id);
            if (element.subtype === 'betrag')  {
              ipt.prop('type','number')
              .prop('min', '0')
              .prop('step','0.01');
              if (value === null) {
                value="0.00";
              }
            }
            ipt.prop('value', value);
            if (element.readonly === true) {
              ipt.prop('readonly',true);
            }
            return $('<div class="form-group col-sm-6">').attr('for',element.id)
                .append($('<label>').attr('for',element.id).text(element.label))
                .append(ipt);
        },
        'radio': function (element, value) {
                var div=$('<div class="form-group col-sm-5">').attr('for',element.id);
                div.append($('<label>').attr('for', element.id).text(element.label));
            $.each(element.options, function (index, option) {
              var radioInput=  $('<input type="radio">')
                      .prop('value', option.id)
                      .prop('name', element.id);
              if (value === option.id) {
                radioInput.prop('checked', true);
              }
              var radioDiv=$('<div class="radio">').append(
                  $('<label>').text(option.text).prepend(
                    radioInput)
                );
              div.append(radioDiv);
            });
              return div;
        },
        'select': function (element, value) {
            var div=$('<div class="form-group">').attr('for',element.id);
            var selectDiv= $('<select class="form-control">').prop('id',element.id);
            $.each(element.options, function (index, option) {
              var opt=$('<option>').prop('value', option.id).text(option.text);
              if (option.id == value) {
                opt.prop('selected', true);
              }
              selectDiv.append(opt);
            });

            div.append($('<label>').attr('for',element.id).text(element.label))
                .append(selectDiv);
            return div;
        }
    };
    function appendElements(sectionDiv, elements, data) {
        $.each(elements, function (index, element) {
            var eleData=null;
            if (element.dbid) {
              eleData=data[element.dbid];
            } else if (data[element.id] !== undefined) {
              eleData=data[element.id];
            }
            sectionDiv.append(viewElements[element.type](element, eleData));
        });

    }

    function hideIfInArray(div, statusVal, array, id) {
        var ele=div.find('.form-group[for='+id+']');
        var found=false;
        if (ele.length===0) {
          console.error('Group not found: '+id);
        }
        $.each(array, function (idx, eleM) {
            if (eleM===statusVal) {
                found = true;
            }
        });
        if (found)  {
            ele.hide();
        } else {
            ele.show();
        }
    }
    function getView(data) {
        var div = $('<div class="container-fluid">');
        function appendSection(idx,section) {
            var sectionDiv=$('<div class="row section">').prop('id','section_'+section.id).attr('idx',idx);
            div.append($('<h3>').text(section.headline));
            appendElements(sectionDiv, section.elements, data);
            div.append(sectionDiv);
        }
        $.each(layout, appendSection);

        function enableDisableBoxes() {
            var statusVal=div.find('input[name=status]:checked').val();
            var arr=['0', '1'];
            hideIfInArray(div, statusVal, arr, 'antragdate');
            hideIfInArray(div, statusVal, arr, 'belegantragsabgabe');
  /*          hideIfInArray(div, statusVal, arr, 'kostenBezahlt');
            hideIfInArray(div, statusVal, arr, 'kostenErwartet');*/
            arr.push('2');
            hideIfInArray(div, statusVal, arr, 'antwortaufantrag');
            arr.push('3');
            arr.push('4');
            arr.push('6');
            arr.push('7');
            hideIfInArray(div, statusVal, arr, 'widersprucheingang');
            hideIfInArray(div, statusVal, arr, 'belegwiderspruchabgabe');
            arr.push('5');
            hideIfInArray(div, statusVal, arr, 'widerspruchantwort');
            arr.push('8');
            arr.push('9');
            arr.push('11');
            arr.push('12');
            hideIfInArray(div, statusVal, arr, 'klagedatum');
            arr.push('13');
            arr.push('10');
            hideIfInArray(div, statusVal, arr, 'urteildatum');
        }
        div.find('input[name=status]').change(enableDisableBoxes);
        enableDisableBoxes();
        div.find('#section_status').after($('<hr>')).after($('<div class="alert alert-info">').text('Du hast Fragen oder möchtest uns etwas mitteilen, was hier im Formular keinen Raum findet? Schreibe uns an ').
        append($('<strong>').append($('<a href="mailto:laeuft@hamburg.adfc.de?subject=Tempo30-Antrag-Daten-Id-'+data.id+'">').text('laeuft@hamburg.adfc.de')))).after($('<hr>'));

        if (data.lastchanged !== null) {
          var mLastChange = moment(data.lastchanged);
          if (mLastChange.add(1,'M').isBefore()) {
            mLastChange = moment(data.lastchanged);
            div.prepend($('<div class="alert alert-warning">')
            .text(' Die Daten wurden das letzte Mal am '+mLastChange.format('DD.MM.YYYY')+
            ' in der Datenbank aktualisiert. Bitte drücken Sie auch bei keiner Änderung auf den "Speichern" Button um uns mitzuteilen, dass es keine Änderung des Status gab ')
            .prepend(
              $('<strong>').text('Achtung')));
          }
        }
        if (data.antragdate !== null) {
          var mAntragDate=moment(data.antragdate, 'YYYY-MM-DD');
          if ((mAntragDate.add(3,'M').isBefore()) && (data.status === '2')) {
              div.prepend($('<div class="alert alert-warning">')
              .text(' Seit der Antragsstelung sind mehr als 3 Monate vergangen. Die Behörde hätte Ihnen antwoten müssen. Sie könnten jetzt eine Untätigkeitsklage gegen die Stadt erheben. Vielleicht macht es auch Sinn, nochmal bei der Behörde nach dem Bearbeitungsstand zu fragen.')
              .prepend(
                $('<strong>').text('Achtung')));
          }
        }
        if (data.updateStatus !== undefined) {
          div.prepend($('<div class="alert alert-success">')
          .text(' Die Daten wurden erfolgreich aktualisiert.')
          .prepend(
            $('<strong>').text('Vielen Dank')));
        }
        div.find('input.datepicker').trigger('change');
        return div;
    }
    return getView;

});

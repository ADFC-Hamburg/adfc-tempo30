define('tempo30/view/antragEditView', [
    'jquery',
    'tempo30/model/version',
    'tempo30/view/fehler_melden_dialog',
    'tempo30/view/fehler_aufgetaucht_dialog',
    'gettext!tempo30',
    'tempo30/model/antragEditLayout',
    //
    'bootstrap',
    'css!lib/bootstrap-datepicker/bootstrap-datepicker3'
], function ($, version, errorMsgDialog, errorOccDialog, gt, layout) {

    'use strtict';

    var viewElements= {
        'button': function (element) {
            return $('<button type="submit" class="btn btn-primary">Speichern</button>');
        },
        'checkbox': function (element) {
            return $('<div class="checkbox">').append(
                $('<label>')
                    .text(element.label)
                    .prepend($('<input type="checkbox">').prop('id', element.id))

            );
        },
        'datepicker': function (element) {
            var input=$('<input type="text" class="form-control">').prop('id',element.id);
            input.datepicker({
                language: "de",
                format: "dd.mm.yyyy",
                todayBtn: "linked",
                orientation: "left"
            });
            return $('<div class="form-group">')
                .append($('<label>').prop('for',element.id).text(element.label))
                .append(input);
            
        },
        'text': function (element) {
            return $('<div class="form-group">')
                .append($('<label>').prop('for',element.id).text(element.label))
                .append($('<input type="text" class="form-control">').prop('id',element.id));
        },
        'select': function (element) {
            var div=$('<div class="form-group">');
            var selectDiv= $('<select class="form-control">').prop('id',element.id);
            $.each(element.options, function (index,option) {
                selectDiv.append($('<option>').prop('value', option.id).text(option.text));
            });

            div.append($('<label>').prop('for',element.id).text(element.label))
                .append(selectDiv);
            return div;
        }
    };
    function appendElements(sectionDiv, elements) {
        $.each(elements, function (index, element) {
            sectionDiv.append(viewElements[element.type](element));
        });
    }
    function getView() {
        var div = $('<div>');
        function appendSection(idx,section) {
            var sectionDiv=$('<div class="section">').prop('id','section_'+section.id).prop('idx',idx);
            div.append($('<h3>').text(section.headline));
            appendElements(sectionDiv, section.elements);
            div.append(sectionDiv);
        }
        $.each(layout, appendSection);

        $('#status').click(function(){
            alert($('#status').val());
        });

        
        return div;
    }

    return getView;

});

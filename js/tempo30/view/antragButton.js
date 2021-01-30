/* usage:

var btn = new AntragButton({onClick: function () {
require(['tempo30/app/antrag'], function (startAntrag) {
startAntrag();
});
}});

btn.addTo(map);

*/

define('tempo30/view/antragButton', [
    'leaflet',
    'gettext!tempo30'
], function (L, gt) {

    'use strict';

    var AntragButton = L.Control.extend({
        options: {
            position: 'topright',
        },

        onAdd: function (map) {

            var controlDiv = L.DomUtil.create('div', 'leaflet-control-command');
            //gt('Tempo 30 beantragen'));
            L.DomEvent
                .addListener(controlDiv, 'click', L.DomEvent.stopPropagation)
                .addListener(controlDiv, 'click', L.DomEvent.preventDefault)
                .addListener(controlDiv, 'click', this.options.onClick);

            var controlUI = L.DomUtil.create('div', 'leaflet-control-command-interior', controlDiv);
            controlUI.title = 'Map Commands';
            controlUI.innerText = gt('Tempo 30 beantragen');
            return controlDiv;
        }
    });

    return AntragButton;
});

define('tempo30/view/layer/t30tmsurl', [
], function () {

    'use strict';
    
    //    return "https://{s}.tools.adfc-hamburg.de/cgi-bin/tile-t30/{layers}/{z}/{x}/{y}";
    
    return "https://{s}.tools.adfc-hamburg.de/cgi-bin/mapserv.fcgi?map=/opt/mapserver/maps/t30/t30.map&layers={layers}&mode=tile&tilemode=gmap&tile={x}+{y}+{z}";
});

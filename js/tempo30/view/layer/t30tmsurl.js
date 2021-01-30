define('tempo30/view/layer/t30tmsurl', [
], function () {

    'use strict';


    return {
        base:"https://{s}.adfc-hamburg.de/tiles/t30/{layers}/{z}/{x}/{y}",
        subdomains: ['tools',],
    };

   /* return {
        base:"https://{s}.secure.raxcdn.com/tiles/t30/{layers}/{z}/{x}/{y}",
        subdomains: ['adfc-hh-tiles.scdn2','adfc-hh-tiles2.scdn5','adfc-hh-tiles3.scdn4'],
    };*/

/*     return {
        base:"https://{s}/tiles/t30/{layers}/{z}/{x}/{y}",
        subdomains: ['tilesadfchh1-5ec0.kxcdn.com','tilesadfchh2-5ec0.kxcdn.com'],
    };
*/
    //return "https://{s}.tools.adfc-hamburg.de/cgi-bin/mapserv.fcgi?map=/opt/mapserver/maps/t30/t30.map&layers={layers}&mode=tile&tilemode=gmap&tile={x}+{y}+{z}";
});

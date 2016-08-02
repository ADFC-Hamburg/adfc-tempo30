define('tempo30/model/osm-points-tags', [], function () {
   'use strict';

    var osmTags=[{
        k:'amenity',
        v:'kindergarten',
        t:'Kindergarten',
        c:'red',
    },{
        k:'amenity',
        v:'school',
        t:'Schule',
        c:'red',
    },{
        k:'amenity',
        v:'retirement_home',
        t:'Altenheim',
        c:'brown',
    },{
        k:'amenity',
        v:'nursing_home',
        t:'Pflegeheim',
        c:'pink',
    },{
        k:'amenity',
        v:'hospital',
        t:'Krankenhaus',
        c:'pink'
    },{
        k:'amenity',
        v:'clinic',
        t:'Klinik',
        c:'pink'
    },{
        k:'healthcare',
        v:'rehabilitation',
        t:'Reha-Einrichtung',
        c:'pink',
    },{
        k:'health-faciltiy',
        v:'therapy',
        t:'Theraie-Einrichtung',
        c:'pink',
    },{
        k:'health-faciltiy',
        v:'rehabilitation',
        t:'Reha-Einrichtung',
        c:'pink',
    },{
        k:'leisure',
        v:'playground',
        t:'Spielplatz',
	c:'green',
    }];

    return osmTags;
});
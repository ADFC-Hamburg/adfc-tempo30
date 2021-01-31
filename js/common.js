requirejs.config({
    baseUrl: 'js',
    paths: {
        'jquery': '../node_modules/jquery/dist/jquery',
        'jed': '../node_modules/jed/jed',
        'jszip-utils': '../node_modules/jszip-utils/dist/jszip-utils',
        'js.cookie': '../lib/js-cookie/js.cookie',
        'bootstrap': '../node_modules/bootstrap/dist/js/bootstrap',
        'bootstraptypehead': '../node_modules/bootstrap-3-typeahead/bootstrap3-typeahead',
        'bootstrap-dialog': '../node_modules/bootstrap3-dialog/dist/js/bootstrap-dialog',
        'bootstrap-datepicker': '../node_modules/bootstrap-datepicker/js/bootstrap-datepicker',
        'docxtemplater': '../node_modules/docxtemplater/build/docxtemplater',
        'leaflet': '../node_modules/leaflet/dist/leaflet',
        'text': '../node_modules/requirejs-plugins/lib/text',
        'leafletmarker': '../node_modules/leaflet.markercluster/dist/leaflet.markercluster',
        'leaflethash': '../node_modules/leaflet-hash/lib/leaflet-src',
        'css-builder': '../node_modules/require-css/css-builder',
        'file-saver': '../node_modules/file-saver/dist/',
        'lessc': '../lib/require-less/lessc',
        'less': '../lib/require-less/less',
        'css': '../node_modules/require-css/css',
        'normalize': '../node_modules/require-css/normalize',
        'pizzip': '../node_modules/pizzip/dist/pizzip',
        'moment': '../node_modules/moment/moment',
        'leaflet-layer-overpass': '../node_modules/leaflet-overpass-layer/dist/OverPassLayer.bundle',
        'rsvp': '../node_modules/rsvp/dist/rsvp',
        'node_modules': '../node_modules',
        'data': '../data',
        'img': '../img',
        'docx': '../docx',
    },
    shim: {
        'jquery': {
            exports: '$',
        },
        'jqueryjquery': {
            deps: ['jquery'],
            exports: 'jQuery',
        },
        jquerycookie: {
            deps: ['jquery'],
            exports: '$.cookie',
        },
        leaflet: {
            exports: 'L',
        },
        leafletmarker: {
            deps: ['leaflet'],
        },
        leaflethash: {
            deps: ['leaflet'],
        },
        bootstrap: {
            deps: ['jquery'],
        },
        bootstraptypehead: {
            deps: ['bootstrap'],
        },
        'bootstrap-dialog': {
            deps: ['jquery', 'bootstrap'],
        },
        'leaflet-layer-overpass': {
            deps: ['leaflet'],
        },
        'bootstrap-datepicker': {
            deps: ['jquery','bootstrap'],
        },
    }
});

requirejs.config({
    baseUrl: 'js',
    paths: {
        'jquery': '../lib/jquery/jquery',
        'jed': '../node_modules/jed/jed',
        'js.cookie': '../lib/js-cookie/js.cookie',
        'bootstrap': '../lib/bootstrap/bootstrap',
        'bootstraptypehead': '../lib/bootstrap3-typeahead/bootstrap3-typeahead',
        'bootstrap-dialog': '../lib/bootstrap3-dialog/bootstrap-dialog.min',
        'bootstrap-datepicker': '../lib/bootstrap-datepicker/bootstrap-datepicker.min',
	'bootstrap-datepicker-de': '../bower_components/bootstrap-datepicker/js/locales/bootstrap-datepicker.de',
        'leaflet': '../lib/leaflet/leaflet',
	'text': '../lib/requirejs-plugins/text',
        'leafletmarker': '../lib/leaflet.markercluster/dist/leaflet.markercluster',
        'leaflethash': '../lib/leaflet-hash/leaflet-hash',
        'normalize': '../lib/require-less/normalize',
        'css-builder': '../bower_components/require-css/css-builder',
        'lessc': '../lib/require-less/lessc',
        'less': '../lib/require-less/less',
        'css': '../lib/require-css/css',
	'moment': '../lib/moment/moment',
	'leaflet-layer-overpass': '../bower_components/leaflet-layer-overpass/dist/OverPassLayer',
	'rsvp': '../node_modules/rsvp/dist/rsvp',
	'lib': '../lib',
	'data': '../data',
	'img': '../img',
	'docx': '../docx',
    },
    shim: {
	'jquery': {
	    exports: '$',
	},
        jquerycookie: {
            deps: ['jquery'],
            exports: '$.cookie',
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
	    exports: '$.fn.datepicker',
	},
	 'bootstrap-datepicker-de': {
	    deps: ['bootstrap-datepicker'],
	 }
    }
});

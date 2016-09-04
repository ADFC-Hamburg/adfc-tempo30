
module.exports = function(grunt) {
 
    grunt.initConfig({
        clean: ['fonts', 
                'css/generated.css', 
                'js/generated.js', 
                'bower_components', 
                'js/i18n/**',
                'dist'],
        bower: {
            install: {
                options: {
                    copy: true,
                    verbose: true,
                },
  //just run 'grunt bower:install' and you'll see files from your Bower packages in lib directory
            },
        },
        jshint: {
            all: ['Gruntfile.js', 'js/**.js', 'js/**/**.js', 'config.js'  ]
        },
        eslint: {
            target: ['Gruntfile.js', 'js/**.js', 'js/**/**.js', 'config.js', '!js/tempo30/model/version.js' ]
        },
        copy: {
/*            i18n_en: {
                files: [
                    {src: 'i18n/tempo30.pot',
                    dest: 'i18n/en_US.po'
                    }
                ]
            },*/
            i18n: {
                files: [
                    {expand: true,
                     flatten: true,
                     src: 'js/i18n/*.js',
                     dest: 'dist/i18n/',
                     filter: 'isFile',
                    }
                ]
            },
            fonts: {
                files: [
                    {expand: true, flatten: true, src: ['bower_components/*/fonts/*'], dest: 'fonts/', filter: 'isFile'},
                ]
            },
            dist: {
		files: [
                    {expand: true, 
                     flatten: false, 
                     src: ['index.html', 
                           'validator-test.html',
                           'lib/**',
                           'css/generated.css*',
		           'css/images/*',
                           'bower_components/requirejs/require.js',
                           'fonts/*',
                           'data/*',
			   'update-overpass.js',
                           'bower_components/leaflet/dist/images/*',
			   'node_modules/requirejs/**',
                          ], 
                     dest: 'dist/', 
                     filter: 'isFile'},
                ]
            },
        },
        cssmin: {
            css: {
                options: {
                    sourceMap: true,
                },
                files: {
                    'css/generated.css': [
                        'lib/leaflet/leaflet.css',
                        'lib/leaflet.markercluster/dist/MarkerCluster.css',
                        'lib/leaflet.markercluster/dist/MarkerCluster.Default.css',
                        'lib/bootstrap3-dialog/bootstrap-dialog.min.css',
                        'bower_components/font-awesome/css/font-awesome.css',
                        'bower_components/bootstrap/dist/css/bootstrap.css',
                        'css/screen.css'
                    ]
                }
            }
        },
        requirejs: {
            common: {
                options: {
                    baseUrl: 'js',
                    mainConfigFile: 'js/common.js',
                    out: 'dist/js/common.js',
                    include: ['jquery','bootstrap'],
                }
            },
	    common_nojq: {
                options: {
                    baseUrl: 'js',
                    mainConfigFile: 'js/common.js',
                    out: 'dist/js/common_nojq.js',
		    include: ['text'],
		    exclude: ['jquery','bootstrap'],
                }
	    },
            map: {
                options: {
                    baseUrl: 'js',
                    mainConfigFile: 'js/common.js',
                    out: 'dist/tempo30/app/map.js',
                    name: 'tempo30/app/map',
                    exclude: ['jquery', 'bootstrap'],
                }
            },
	    update_overpass: {
                options: {
                    baseUrl: 'js',
		    paths: {
                        'fs':'empty:',
			'request': '../node_modules/request/request',
                    },
                    mainConfigFile: 'js/common.js',
                    out: 'dist/tempo30/app/update-overpass.js',
                    name: 'tempo30/app/update-overpass',
                    exclude: ['jquery', 'bootstrap', 'request' ],
                }
	    },
        },
        watch: {
            scripts: {
                files: ['Gruntfile.js', 'js/**.js', 'js/**/**.js', 'config.js', '!js/leaflet.geocsv-src.js', '!js/leaflet.geocsv.js' ],
                tasks: ['eslint', 'jshint', 'copy', 'requirejs'],
            }
        },
        'git-describe': {
            options: {
                prop: 'meta.revision'
            },
            me: {}
        },
        create_pot: {
            simple: {
                options: {
                    headers: {
                        'Last-Translator': 'NAME <EMAIL>',
                        'Language-Team': 'NAME <EMAIL>',
                        'Content-Type': 'text/plain; charset=UTF-8',
                        'Content-Transfer-Encoding': '8bit',
                        'Plural-Forms': 'nplurals=2; plural=(n!=1);'
                    }
                },
                files: {
                    'i18n/tempo30.pot': ['js/tempo30/**/**.js']
                }
            }
        },
        compile_po: { 
            simple: {
                options: {
                    template: 'i18n/templates/po_template.js',
                },
                src: ['i18n/*.po'],
                dest: 'js/i18n/'
            }
        }
    });


    grunt.event.once('git-describe', function (rev) {
        grunt.log.writeln('Git Revision: ' + rev);
        var out = 'define(\'tempo30/model/version\', function () { return '+
            JSON.stringify({
                revision: rev[0],
                date: grunt.template.today()
            })+';});';
        grunt.file.write('js/tempo30/model/version.js', out.replace(/\"/g, '\'').replace(/,/g, ', '));
    });
    grunt.loadNpmTasks('grunt-eslint');
    grunt.loadNpmTasks('grunt-contrib-cssmin');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-bower-task');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-git-describe');
    grunt.loadNpmTasks('grunt-contrib-requirejs');
    grunt.loadNpmTasks('grunt-require-gettext');
    grunt.task.registerTask('default', ['bower',  'git-describe', 'eslint', 'jshint', 'create_pot', 
                                        'compile_po', 'requirejs', 'cssmin', 'copy:fonts', 'copy:dist', 'copy:i18n']);

    grunt.registerTask('update-overpass', 'update-data from overpass api', function(arg1) {
        var done = this.async(),
            testmode = false,
            requirejs = require('requirejs');

        requirejs.config({
            baseUrl: __dirname,
        });
	console.log(arg1);
        if ((arg1 !== undefined) && (arg1 === 'test')) {
            testmode = true;
        }
        requirejs(['js/common'], function () {
            requirejs(['tempo30/app/update-overpass'], function(updateOverpass) {
                console.log('loaded');
                updateOverpass(testmode, done, done);
            }, function(e) {
                console.log('err',e);
                done();
            });
        }, function (a) {
            console.log('error', a);
            done();
        });
    });

};

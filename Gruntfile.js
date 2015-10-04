module.exports = function (grunt)  
{
    // load all grunt tasks
    require('load-grunt-tasks')(grunt);

    // Project configuration.
    grunt.initConfig(
    {
        pkg: grunt.file.readJSON('package.json'),

        dirs: {
            source: 'src',
            staging: 'staging',
            release: 'dist'
        },

        /* Testing */
        jshint: {
            options: {
                asi: true, eqnull: true, jquery: true
            },
            source: ['<%= dirs.source %>/js/**/*.js']
        },

        /* Cleaning */
        clean: {
            staging: ['<%= dirs.staging %>'],
            release: ['<%= dirs.release %>']
        },

        /* Build files */
        mustache_render: {
            staging: {
                files:
                [{
                    expand: true,
                    cwd: '<%= dirs.source %>/',
                    src: '*.html',
                    dest: '<%= dirs.staging %>/',
                    data: {
                        title: '<%= pkg.title %>',
                        description: '<%= pkg.description %>',
                        version: '<%= pkg.version %>',
                        files: {
                            stylesheets: grunt.file.expand({cwd: 'src'}, 'css/**/*.css').map(function(path){ return {src: '/' + path}; }),
                            scripts: grunt.file.expand({cwd: 'src'}, 'js/**/*.js').map(function(path){ return {src: '/' + path}; }),
                            templates: 'js/templates.js'
                        }
                    }
                }]
            },
            release: {
                files:
                [{
                    expand: true,
                    cwd: '<%= dirs.source %>/',
                    src: '*.html',
                    dest: '<%= dirs.release %>/',
                    data: {
                        title: '<%= pkg.title %>',
                        description: '<%= pkg.description %>',
                        version: '<%= pkg.version %>',
                        files: {
                            stylesheets: [{src: '/css/styles-<%= pkg.version %>.min.css'}],
                            scripts: grunt.file.expand({cwd: 'src'}, 'js/**/*.js').map(function(path){ return {src: '/' + path}; }),
                            templates: '/js/templates-<%= pkg.version %>.js'
                        }
                    }
                }]
            }
        },

        /* Compress files */
        cssmin: {
            combine: {
                files: {
                    '<%= dirs.release %>/css/styles-<%= pkg.version %>.min.css': [
                        '<%= dirs.source %>/css/**/*.css',
                        '!*.combine.css',
                        '!*.min.css'
                    ]
                }
            }
        },

        /* Copy and concatinate files */
        copy: {
            staging: {
                files: [
                    {expand: true, cwd: '<%= dirs.source %>', src: ['*.json','*.txt','*.ico','images/**','css/**','js/**','!js/**-default.js', 'WEB-INF/web.xml'], dest: '<%= dirs.staging %>/', filter: 'isFile'},
                    {expand: true, cwd: '<%= dirs.source %>/vendor', src: ['*/*.js','*/*.css','*/*.png','*/dist/**','*/lib/**',"!**/Gruntfile.js"], dest: '<%= dirs.staging %>/js/lib'}
                ]
            },
            release: {
                files: [
                    {expand: true, cwd: '<%= dirs.source %>', src: ['*.txt', '*.ico', 'images/**', 'css/**', 'js/**', '!js/**-default.js'], dest: '<%= dirs.release %>/', filter: 'isFile'},
                    {expand: true, cwd: '<%= dirs.source %>/vendor', src: ['*/*.js','*/*.css','*/*.png','*/dist/**','*/lib/**',"!**/Gruntfile.js"], dest: '<%= dirs.release %>/js/lib'}
                ]
            }
        },

        mustache: {
            staging : {
                src: '<%= dirs.source %>/templates/',
                dest: '<%= dirs.staging %>/js/templates.js',
                options: {
                    prefix: 'Templates = ',
                    postfix: ';'
                }
            },
            release : {
                src: '<%= dirs.source %>/templates/',
                dest: '<%= dirs.release %>/js/templates-<%= pkg.version %>.js',
                options: {
                    prefix: 'Templates = ',
                    postfix: ';'
                }
            }
        },

        /* Balance processes */
        concurrent: {
            staging: ['mustache_render:staging', 'copy:staging', 'mustache:staging'],
            release: ['mustache_render:release', 'cssmin', 'copy:release', 'mustache:release'],
            watch: ['newer:mustache_render:staging', 'newer:copy:staging', 'mustache:staging']
        },

        /* Watch the beast */
        watch: {
            options: {cwd: '<%= dirs.source %>'},
            files: ['*.html', '*.js','css/**/*.css','js/**/*.js','templates/**/*.mustache'],
            tasks: ['concurrent:watch']
        },
                              
      /*
       * Build a WAR (web archive) without Maven or the JVM installed.
       */
      war: {
        target: {
          options: {
            war_dist_folder: '<%= dirs.staging %>',
            war_name: 'superadmin'
          },
          files: [
            {
              expand: true,
              cwd: '<%= dirs.staging %>',
              src: ['**'],
              dest: ''
            }
          ]
        }
      },
      
      tomcat_deploy: {
        host: 'localhost',
        login: 'xxxxx',
        password: 'yyyyy',
        path: '/superadmin',
        port: '8080',
        dist: 'staging',
        deploy: '/manager/text/deploy',
        undeploy: '/manager/text/undeploy'
      }
      
    });

    // Register tasks
    grunt.registerTask('staging', ['jshint:source', 'clean:staging', 'concurrent:staging']);
    grunt.registerTask('release', ['jshint:source', 'clean:release', 'concurrent:release']);
    grunt.registerTask('watcher', ['watch']);
    grunt.registerTask('deploy', ['staging', 'war']);
};

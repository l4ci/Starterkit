module.exports = function(grunt) {
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        // SASS task config
        sass: {
            dist: {
                files: {
                    'assets/css/main.css' : 'assets/scss/bootstrap.scss'
                }
            }
        },
        // Watch task config
        watch: {
            options: {
                spawn: false // Important, don't remove this!
            },
            css: {
                files: 'assets/**/*.scss',
                tasks: ['sass','postcss','bsReload:css']
            },
            html: {
                files: '*.html',
                tasks: ['bsReload:all']
            }
        },
        postcss: {
            options: {
                map: {
                    inline: false,            // save all sourcemaps as separate files...
                    annotation: 'assets/css/' // ...to the specified directory
                },

                processors: [
                    require('postcss-focus')(),     // add :focus to :hover
                    require('pixrem')(),            // add fallbacks for rem units
                    require('pixrem')(),            // add fallbacks for rem units
                    require('autoprefixer-core')({  // add vendor prefixes
                        browsers: 'last 2 versions'
                    }),
                    require('cssnano')()            // minify the result
                ]
            },
            dist: {
                src: 'assets/css/*.css'
            }
        },
        // BrowserSync config
        browserSync: {
            bsFiles: {
                src: [
                    'assets/css/*.css',
                    '*.html'
                ]
            },
            options: {
                watchTask: true,
                //reloadDelay: 2000,
                reloadDebounce: 1000,
                server: {
                    baseDir: './'
                }
            }
        },
        bsReload: {
            css: {
                reload: "main.css"
            },
            all: {
                reload: true
            }
        }
    });

    grunt.loadNpmTasks('grunt-contrib-sass');
    grunt.loadNpmTasks('grunt-postcss');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-browser-sync');

    grunt.registerTask('default', ['browserSync','watch']);
}

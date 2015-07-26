module.exports = function(grunt) {
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        watch: {
            css: {
                files: 'assets/scss/*.scss',
                tasks: ['sass']
            }
        },
        sass: {
            dist: {
                files: {
                    'assets/css/main.css' : 'assets/scss/bootstrap.scss'
                }
            }
        },
        browserSync: {
          default_options: {
            bsFiles: {
              src: [
                "assets/css/*.css",
                "*.html"
              ]
            },
            options: {
              watchTask: true,
              server: {
                baseDir: "./"
              }
            }
          }
        }
    });
    grunt.loadNpmTasks('grunt-contrib-sass');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-browser-sync');

    grunt.registerTask('default', ['browserSync', 'watch']);
}

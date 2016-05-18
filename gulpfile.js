/* * * * *
 * GULP
 * *
 * 1) Install local gulp: `npm install gulp`
 * 2) Install gulp plugins: `npm install gulp-server-livereload gulp-autoprefixer gulp-changed gulp-concat gulp-cache gulp-imagemin gulp-livereload gulp-notify gulp-rename gulp-clean-css gulp-sass gulp-sourcemaps gulp-plumber gulp-uglify gulp-util --save-dev`
*/

var gulp = require('gulp');

// Load plugins
var server       = require('gulp-server-livereload'),
    autoprefixer = require('gulp-autoprefixer'),
    changed      = require('gulp-changed'),
    concat       = require('gulp-concat'),
    cache        = require('gulp-cache'),
    imagemin     = require('gulp-imagemin'),
    livereload   = require('gulp-livereload'),
    notify       = require('gulp-notify'),
    rename       = require('gulp-rename'),
    cleanCSS     = require('gulp-clean-css'),
    sass         = require('gulp-sass'),
    sourcemaps   = require('gulp-sourcemaps'),
    plumber      = require('gulp-plumber'),
    uglify       = require('gulp-uglify'),
    uti          = require('gulp-util');


// FOLDERS
var ASSETS   = 'assets/';

// STYLES
gulp.task('styles', function() {
  return gulp.src(ASSETS + 'scss/bootstrap.scss')
      .pipe(sass({
        outputStyle: 'expanded',
        debugInfo: true,
        lineNumbers: true,
        onSuccess: function(){
          notify("SCSS Compiled successfully!");
        },
      }).on('error', function(err){
        sass.logError;
        notify().write(err);
        this.emit('end');
      })
    )
    .pipe(autoprefixer('last 2 version'))
    .pipe(rename({ basename: "main", suffix: '.min' }))
    .pipe(sourcemaps.write('.'))
    .pipe(cleanCSS())
    .pipe(gulp.dest(ASSETS + 'css'))
    .pipe(notify("STYLES finished!"));
});


// SCRIPTS
gulp.task('scripts', function() {
  return gulp.src([ASSETS + 'js/_/*.js' , ASSETS + 'js/main.js'])
    .pipe(sourcemaps.init())
    .pipe(concat('app.js'))
    .pipe(sourcemaps.write())
    .pipe(rename({ suffix: '.min' }))
    .pipe(uglify())
    .pipe(gulp.dest(ASSETS+'js'))
    .pipe(notify("SCRIPTS finished!"));
});


// IMAGES
gulp.task('images', function() {
  return gulp.src(ASSETS + 'rawimg/**/*')
    .pipe(cache(imagemin({ optimizationLevel: 3, progressive: true, interlaced: true })))
    .pipe(gulp.dest(ASSETS+'img'))
    .pipe(notify("IMAGES finished!"));
});

gulp.task('serve', function() {
    gulp.src('./')
        .pipe(server({
        host: 'localhost',
        port: 8000,
        livereload: false,
        directoryListing: false,
        open: true,
        defaultFile: './starterkit.html'
        })
    );
});


// DEFAULT TASK - starts the WATCH task
gulp.task('default', ['watch','serve']);


// WATCH
gulp.task('watch', function() {

    livereload.listen();

    gulp.watch(ASSETS + 'scss/**/*.scss', ['styles']).on('change', livereload.changed);
    gulp.watch(ASSETS + 'js/**/*.js', ['scripts']).on('change', livereload.changed);
    gulp.watch(ASSETS + 'rawimg/**/*', ['images']).on('change', livereload.changed);
    gulp.watch('./**/*.html').on('change', livereload.changed);

});

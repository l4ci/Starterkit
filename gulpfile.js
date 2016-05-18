/* * * * *
 * GULP
 * *
 * 1) Install local gulp: `npm install gulp`
 * 2) Install gulp plugins: `npm install gulp-autoprefixer gulp-changed gulp-concat gulp-cache gulp-imagemin gulp-livereload gulp-notify gulp-rename gulp-cssnano gulp-ruby-sass gulp-sourcemaps gulp-plumber gulp-uglify gulp-util --save-dev`
*/

var gulp = require('gulp');

// Load plugins
var autoprefixer = require('gulp-autoprefixer'),
    changed      = require('gulp-changed'),
    concat       = require('gulp-concat'),
    cache        = require('gulp-cache'),
    imagemin     = require('gulp-imagemin'),
    livereload   = require('gulp-livereload'),
    notify       = require('gulp-notify'),
    rename       = require('gulp-rename'),
    cssnano      = require('gulp-cssnano'),
    sass         = require('gulp-ruby-sass'),
    sourcemaps   = require('gulp-sourcemaps'),
    plumber      = require('gulp-plumber'),
    uglify       = require('gulp-uglify'),
    uti          = require('gulp-util');


// FOLDERS
var ASSETS   = 'assets/';


// STYLES
gulp.task('styles', function() {
  return gulp.src(ASSETS + 'scss/bootstrap.scss')
    .pipe(sass({sourcemap: true,}).on('error', notify.onError('<%= error.message %>') ) )
    .pipe(autoprefixer('last 2 version'))
    .pipe(rename({ basename: "main", suffix: '.min' }))
    .pipe(cssnano())
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest(ASSETS + 'css'))
    .pipe(notify("STYLES finished!"));
});


// SCRIPTS
gulp.task('scripts', function() {
  return gulp.src([ASSETS + 'js/_/*.js' , ASSETS + 'js/plugins/*.js', ASSETS + 'js/**/*.js' ,ASSETS + 'js/main.js'])
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
  return gulp.src(ASSETS + 'img/**/*')
    .pipe(cache(imagemin({ optimizationLevel: 3, progressive: true, interlaced: true })))
    .pipe(gulp.dest(ASSETS+'img'))
    .pipe(notify("IMAGES finished!"));
});


// DEFAULT TASK - starts the WATCH task
gulp.task('default', function() {
  gulp.start('watch');
});


// WATCH
gulp.task('watch', function() {

  gulp.watch(ASSETS + 'scss/**/*.scss', ['styles']);
  gulp.watch(ASSETS + 'js/**/*.js', ['scripts']);
  gulp.watch(ASSETS + 'img/**/*', ['images']);


  livereload.listen();
  gulp.watch([SRC + '**']).on('change', livereload.changed)
  .pipe(notify("Reloading!"));
});

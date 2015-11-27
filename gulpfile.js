/*!
 * gulp
 * $ npm install gulp-autoprefixer gulp-changed gulp-concat gulp-cache del vinyl-ftp gulp-imagemin gulp-livereload gulp-minify-css gulp-notify gulp-rename gulp-ruby-sass gulp-uglify gulp-util del --save-dev
*/

var gulp = require('gulp');

// Load plugins
var autoprefixer = require('gulp-autoprefixer'),
    changed      = require('gulp-changed'),
    concat       = require('gulp-concat'),
    cache        = require('gulp-cache'),
    del          = require('del'),
    ftp          = require('vinyl-ftp'),
    imagemin     = require('gulp-imagemin'),
    livereload   = require('gulp-livereload'),
    minifycss    = require('gulp-minify-css'),
    notify       = require('gulp-notify'),
    rename       = require('gulp-rename'),
    sass         = require('gulp-ruby-sass'),
    uglify       = require('gulp-uglify'),
    util         = require('gulp-util');


// Set Folders
var SRC     = 'source/',
    BUILD   = 'public/',
    SRCASSETS   = SRC+'assets/',
    BUILDASSETS = BUILD+'assets/';

// FTP
var FTP_HOST = 'ftp.website.tld',
    FTP_PORT = 21,
    FTP_USER = 'user',
    FTP_PW   = 'mypass',
    FTP_DIR  = '/public_html';


// Styles
gulp.task('styles', function() {
  return sass(SRCASSETS+'scss/bootstrap.scss', { style: 'expanded' })
    .pipe(autoprefixer('last 2 version'))
    .pipe(gulp.dest(BUILDASSETS+'css'))
    .pipe(rename({ suffix: '.min' }))
    .pipe(minifycss())
    .pipe(gulp.dest(BUILDASSETS+'css'));
});

// Scripts
gulp.task('scripts', function() {
  return gulp.src(SRCASSETS + 'js/**/*.js')
    .pipe(concat('main.js'))
    .pipe(gulp.dest(BUILDASSETS+'js'))
    .pipe(rename({ suffix: '.min' }))
    .pipe(uglify())
    .pipe(gulp.dest(BUILDASSETS+'js'));
});

// Images
gulp.task('images', function() {
  return gulp.src(SRCASSETS + 'img/**/*')
    .pipe(cache(imagemin({ optimizationLevel: 3, progressive: true, interlaced: true })))
    .pipe(gulp.dest(BUILDASSETS+'img'));
});

// Default task
gulp.task('default', function() {
  gulp.start('styles', 'scripts', 'images');
});

// FTP Deploy
gulp.task('deploy', function () {

    var conn = ftp.create( {
        host:     FTP_HOST,
        port:     FTP_PORT,
        user:     FTP_USER,
        password: FTP_PW,
        parallel: 10,
        log:      gutil.log
    } );

    var globs = [ BUILD+'/**' ];

    return gulp.src( globs, { base: '.', buffer: false } )
        .pipe( conn.newer( FTP_DIR ) )
        .pipe( conn.dest( FTP_DIR ) );
} );

// Watch
gulp.task('watch', function() {

  gulp.watch(SRCASSETS + 'scss/**/*.scss', ['styles']);
  gulp.watch(SRCASSETS + 'js/**/*.js', ['scripts']);
  gulp.watch(SRCASSETS + 'img/**/*', ['images']);

  livereload.listen();
  gulp.watch([SRC+'**']).on('change', livereload.changed);
});

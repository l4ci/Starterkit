/*!
 * gulp
 * $ npm install gulp-autoprefixer gulp-changed gulp-concat gulp-cache del gulp-file-include vinyl-ftp gulp-imagemin gulp-livereload markdown gulp-minify-css gulp-notify gulp-rename gulp-ruby-sass gulp-sourcemaps gulp-uglify gulp-util del --save-dev
*/

var gulp = require('gulp');

// Load plugins
var autoprefixer = require('gulp-autoprefixer'),
    changed      = require('gulp-changed'),
    concat       = require('gulp-concat'),
    cache        = require('gulp-cache'),
    del          = require('del'),
    fileinclude  = require('gulp-file-include'),
    ftp          = require('vinyl-ftp'),
    imagemin     = require('gulp-imagemin'),
    livereload   = require('gulp-livereload'),
    markdown     = require('markdown'),
    minifycss    = require('gulp-minify-css'),
    notify       = require('gulp-notify'),
    rename       = require('gulp-rename'),
    sass         = require('gulp-ruby-sass'),
    sourcemaps   = require('gulp-sourcemaps'),
    uglify       = require('gulp-uglify'),
    util         = require('gulp-util');


// FOLDERS
var SRC         = 'src/',
    BUILD       = 'build/',
    SRCASSETS   = SRC   + 'assets/',
    BUILDASSETS = BUILD + 'assets/';

// FTP-SETTINGS
var FTP_HOST = 'ftp.website.tld',
    FTP_PORT = 21,
    FTP_USER = 'user',
    FTP_PW   = 'mypass',
    FTP_DIR  = '/public_html';


// STYLES
gulp.task('styles', function() {
  return sass(SRCASSETS + 'scss/bootstrap.scss', { style: 'expanded' })
    .pipe(autoprefixer('last 2 version'))
    .pipe(rename({ basename: "main", suffix: '.min' }))
    .pipe(minifycss())
    .pipe(gulp.dest(BUILDASSETS+'css'));
});


// SCRIPTS
gulp.task('scripts', function() {
  return gulp.src([SRCASSETS + 'js/_/*.js' , SRCASSETS + 'js/main.js', SRCASSETS + 'js/plugins/*.js', SRCASSETS + 'js/**/*.js'])
    .pipe(sourcemaps.init())
    .pipe(concat('app.js'))
    .pipe(sourcemaps.write())
    .pipe(rename({ suffix: '.min' }))
    .pipe(uglify())
    .pipe(gulp.dest(BUILDASSETS+'js'));
});


// IMAGES
gulp.task('images', function() {
  return gulp.src(SRCASSETS + 'img/**/*')
    .pipe(cache(imagemin({ optimizationLevel: 3, progressive: true, interlaced: true })))
    .pipe(gulp.dest(BUILDASSETS+'img'));
});


// FILE INCLUDES
gulp.task('fileinclude', function() {

    // HTML Files
    return gulp.src( [ SRC + '*.+(html)'],{'base' : SRC} )
    .pipe(fileinclude({
        prefix: '@@',
        basepath: '@file',
        filters: {
            markdown: markdown.parse
        }
    }))
    .pipe( gulp.dest(BUILD) );
});

// DEFAULT TASK
gulp.task('default', function() {
  gulp.start('styles', 'scripts', 'images', 'fileinclude', 'copy');
});

// FTP DEPLOY
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


// WATCH
gulp.task('watch', function() {

  gulp.watch(SRCASSETS + 'scss/**/*.scss', ['styles']);
  gulp.watch(SRCASSETS + 'js/**/*.js', ['scripts']);
  gulp.watch(SRCASSETS + 'img/**/*', ['images']);

  gulp.watch(SRC + '**/*.+(html|md|markdown)', ['fileinclude']);

  gulp.watch(SRC + '**', ['copy']);

  livereload.listen();
  gulp.watch([SRC + '**']).on('change', livereload.changed);
});


// COPY
// @todo: Only copy whats not already inside a build chain
// gulp.task('copy', function () {
//     gulp.src([
//         SRC + '**',                              // Include all
//         '!' + SRCASSETS,                         // Exclude assets folder
//         '!' + SRC + 'inc/**',                    // Exclude include files
//         '!' + SRC + '**/*.+(html|md|markdown)',  // Exclude html/Markdown files
//     ],{'base' : SRC})
//     .pipe(gulp.dest( BUILD ));
// });

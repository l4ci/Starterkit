'use strict';

const gulp         = require('gulp'),
      del          = require('del'),
      sass         = require('gulp-sass'),
      sourcemaps   = require('gulp-sourcemaps'),
      cleanCSS     = require('gulp-clean-css'),
      autoprefixer = require('gulp-autoprefixer'),
      minify       = require('gulp-minify'),
      browserSync  = require('browser-sync').create(),
      include      = require("gulp-include"),
      imagemin     = require('gulp-imagemin'),
      http         = require('http'),
      st           = require('st');

// PATHS
var path = __dirname;
var src  = path + '/src/',
    dist = path + '/dist/';


gulp.task('default', ['styles', 'scripts', 'images']);

gulp.task('clean', function () {
    del([ dist + 'css/*']);
    del([ dist + 'js/*']);
});

gulp.task('build', ['clean'] , function(){
    // Build everything
});

gulp.task('styles', function () {
    gulp.src( src + 'scss/**/*.scss' )
        .pipe(sourcemaps.init())
        .pipe(sass().on('error', sass.logError))
        .pipe(cleanCSS())
        .pipe(sourcemaps.write())
        .pipe(autoprefixer())
        .pipe(gulp.dest( dist + 'css' ))
        .pipe(browserSync.stream({match: '**/*.css'}));
});

gulp.task('scripts', function() {
    // Main.js
    gulp.src( src + 'js/main.js')
        .pipe(include()).on('error', console.log)
        .pipe(minify({
            ext:{
                src:'-debug.js',
                min:'.min.js'
            }
        }))
        .pipe(gulp.dest(dist + 'js' ));

    // Copy the rest but exclude main.js and includes
    gulp.src([
        src + 'js/**/*.js',
        '!' + src + 'js/main.js',
        '!' + src + 'js/**/_*.js'
    ]).pipe(gulp.dest(dist + 'js'))
      .pipe(browserSync.stream({match: '**/*.js'}));
});

gulp.task('images', function() {
    gulp.src( src +'img/*')
        .pipe(imagemin())
        .pipe(gulp.dest( dist + 'img'))
        .pipe(refresh());
});

gulp.task('server', function(done) {
    http.createServer(
        st({
            path: dist,
            index: 'index.html',
            cache: false
        })
    ).listen(8080, done);
});

gulp.task('watch', ['server'] ,function () {
    browserSync.init({
        server: {
            baseDir: dist
        }
    });

    gulp.watch( src + 'scss/**/*.scss', ['styles'] );
    gulp.watch( src + 'js/**/*.js', ['scripts'] );
    gulp.watch( dist + '**/*.html').on('change', browserSync.reload);
});

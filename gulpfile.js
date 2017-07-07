'use strict';

var gulp         = require('gulp'),
    del          = require('del'),
    sass         = require('gulp-sass'),
    sourcemaps   = require('gulp-sourcemaps'),
    cleanCSS     = require('gulp-clean-css'),
    autoprefixer = require('gulp-autoprefixer'),
    minify       = require('gulp-minify'),
    include      = require("gulp-include"),
    imagemin     = require('gulp-imagemin');

// PATHS
var src  = './src/',
    dist = './dist/';


gulp.task('default', ['sass', 'scripts', 'images']);

gulp.task('clean', function () {
  return del(['dist/**/*']);
});

gulp.task('build', function(){
    // Clean everything
    // Build everything
});

gulp.task('sass', function () {
  return gulp.src( src + 'scss/**/*.scss' )
    .pipe(sourcemaps.init())
    .pipe(sass().on('error', sass.logError))
    .pipe(cleanCSS())
    .pipe(sourcemaps.write())
    .pipe(autoprefixer())
    .pipe(gulp.dest( dist + 'css' ));
});

gulp.task('scripts', function() {
    gulp.src( src + 'js/main.js')
    .pipe(include()).on('error', console.log)
    .pipe(minify({
        ext:{
            src:'-debug.js',
            min:'.js'
        }
    }))
    .pipe(gulp.dest(dist + 'js' ));
});

gulp.task('images', function() {
    gulp.src( src +'/img/*')
        .pipe(imagemin())
        .pipe(gulp.dest( dist + '/img'));
});

gulp.task('watch', function () {
  gulp.watch( src + 'scss/**/*.scss', ['sass'] );
  gulp.watch( src + 'js/**/*.js', ['scripts'] );
});

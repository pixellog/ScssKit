var gulp = require('gulp');
var sass = require('gulp-sass');
var sourcemaps = require('gulp-sourcemaps');
var browserSync = require('browser-sync');
var autoprefixer = require('gulp-autoprefixer');

var _base = './docs/';
var _baseCss = _base + 'css';
var _baseJs = _base + 'js';
var _baseHtml = _base;

gulp.task('sass', function () {
    return gulp.src(_baseCss + '/**/*.scss')
        .pipe(sourcemaps.init())
        // outputStyle: 'expanded','compressed'
        .pipe(sass({outputStyle: 'compact'}).on('error', sass.logError))
        .pipe(sourcemaps.write())
        // .pipe(sass({includePaths: [_baseCss]}))
        .pipe(autoprefixer({
            browsers: ['last 2 versions'],
            cascade: false
        }))
        .pipe(gulp.dest(_baseCss));
});

gulp.task('browser-sync', function() {
    browserSync.init({
        files: '*.html',
        server: {
            baseDir: _base
        },
        port: 9000,
        notify: false
    });
});

gulp.task('default', ['sass', 'browser-sync'], function () {
    gulp.watch(_baseCss + "/**/*.scss", ['sass']);
});
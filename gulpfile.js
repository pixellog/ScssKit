var gulp = require('gulp');
var scss = require('gulp-sass');
var browserSync = require('browser-sync');
var autoprefixer = require('gulp-autoprefixer');

gulp.task('scss', function () {
    gulp.src('css/**/*.scss')
        .pipe(scss({includePaths: ['css']}))
        .pipe(autoprefixer({
            //
            browsers: ['last 2 versions'],
            // mobile
            // browsers: ['> 1%'],
            cascade: false
        }))
        .pipe(gulp.dest('css'));
});

gulp.task('browser-sync', function() {
    browserSync.init(["css/**/*.css", "js/**/*.js", "**/*.html"], {
        notify: false,
        port: 9000,
        server: {
            baseDir: "./"
        }
    });
});

gulp.task('default', ['scss', 'browser-sync'], function () {
    gulp.watch("css/**/*.scss", ['scss']);
});

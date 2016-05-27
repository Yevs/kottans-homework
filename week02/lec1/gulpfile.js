var gulp = require('gulp');
var postcss = require('gulp-postcss');
var less = require('gulp-less');
var browserSync = require('browser-sync').create();

var autoprefixer = require('autoprefixer');
var cssnano = require('cssnano');

gulp.task('css', function () {
    var processors = [
        autoprefixer,
        cssnano
    ];
    return gulp.src('./*.less')
        .pipe(less())
        .pipe(postcss(processors))
        .pipe(gulp.dest('.'));
});

gulp.task('css-watch', ['css'], () => {
    browserSync.reload();
});
gulp.task('browser-reload', () => {
    browserSync.reload({stream: true});
});

gulp.task('serve', ['css'], () => {
    browserSync.init({
            server: {
                baseDir: './'
            },
            browser: 'google-chrome'
        });
    gulp.watch('./*.less', ['css-watch']);
    gulp.watch('./*.html', browserSync.reload);
});
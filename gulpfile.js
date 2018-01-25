var gulp = require('gulp'),
    gutil = require('gulp-util'),
    browserSync = require('browser-sync').create();

    sass = require('gulp-sass'),
    sourcemaps = require('gulp-sourcemaps'),
    cleanCSS = require('gulp-clean-css'),

    input = {
        'sass': 'src/stylesheets/**/*.scss'
    },
    output = {
        'stylesheets': 'public/css'
    };

/* run the watch task when gulp is called without arguments */
gulp.task('default', ['watch']);


/* compile scss files */
gulp.task('build-css', function () {
    return gulp.src('src/stylesheets/**/*.scss')
        .pipe(sass().on('error', sass.logError))
        .pipe(sourcemaps.init())
        .pipe(sass())
        .pipe(sourcemaps.write())
        .pipe(gulp.dest(output.stylesheets))
        .pipe(browserSync.reload({
            stream: true
        }))
});

// Minify CSS
gulp.task('minify-css', function () {
    return gulp.src('public/assets/stylesheets/*.css')
        .pipe(cleanCSS({compatibility: 'ie8'}))
        .pipe(gulp.dest(output.stylesheets));
});

// BrowserSync
gulp.task('browserSync', function() {
    browserSync.init({
        server: {
            baseDir: './'
        }
    });
});

/* Watch these files for changes and run the task on update */
gulp.task('watch', ['browserSync'], function () {
    gulp.watch(input.sass, ['build-css']);
    gulp.watch('./*', browserSync.reload);
    gulp.watch("./src/pages/*.html").on('change', browserSync.reload);
});
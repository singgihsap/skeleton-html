var gulp = require('gulp'),
    gutil = require('gulp-util')

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
});

// Minify CSS
gulp.task('minify-css', function () {
    return gulp.src('public/assets/stylesheets/*.css')
        .pipe(cleanCSS({compatibility: 'ie8'}))
        .pipe(gulp.dest(output.stylesheets));
});

/* Watch these files for changes and run the task on update */
gulp.task('watch', function () {
    gulp.watch(input.sass, ['build-css']);
});
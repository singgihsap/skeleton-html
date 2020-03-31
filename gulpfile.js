// require modules
var gulp = require('gulp');
var sass = require('gulp-sass');
var cleanCSS = require('gulp-clean-css');
var sourcemaps = require('gulp-sourcemaps');
var autoprefixer = require('gulp-autoprefixer');
var browserSync = require('browser-sync').create();

// target source scss
var input = {
  'sass': 'src/stylesheets/**/*.scss'
};

// output css
var output = {
  'stylesheets': 'src/assets/css',
  'dist': 'dist/assets/css'
};

// run the watch task when gulp is called without arguments
gulp.task('default', ['watch']);

// compile SCSS to CSS files
gulp.task('build-css', function () {
  return gulp.src('src/stylesheets/**/*.scss')
  .pipe(sourcemaps.init())
  .pipe(sass().on('error', sass.logError))
  .pipe(autoprefixer({
    browsers: ['last 2 versions'],
    cascade: false
  }))
  .pipe(sourcemaps.write())
  .pipe(gulp.dest(output.stylesheets))
  .pipe(browserSync.reload({
    stream: true
  }))
});

// for build dist
gulp.task("build-dist", ['build-css'], function () {
  return gulp.src(['src/*.html', "src/assets/css/**", "src/assets/images/**", "src/assets/fonts/**", "src/assets/js/**", "src/assets/vendor/**"], { base: './src' })
  .pipe(gulp.dest('dist'));
});

// Task to minify css using package cleanCSs
gulp.task('minify-css', () => {
  // Folder with files to minify
  return gulp.src('src/assets/css/*.css')
  .pipe(cleanCSS())
  //I define the destination of the minified files with the method dest
  .pipe(gulp.dest(output.dist));
});

// BrowserSync
gulp.task('browserSync', function () {
  browserSync.init(['src/*.html', '*.html'], {
    server: {
      baseDir: './'
    }
  });
});

/* Watch these files for changes and run the task on update */
gulp.task('watch', ['browserSync'], function () {
  gulp.watch(input.sass, ['build-css']);
  gulp.watch('./*.html', browserSync.reload);
  gulp.watch('*.html').on('change', browserSync.reload);
  gulp.watch(['./src/*.html', '*.php']).on('change', browserSync.reload);
});
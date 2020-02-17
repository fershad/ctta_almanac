'use strict';

var autoprefixer = require('gulp-autoprefixer');
var gulp = require('gulp');
var sass = require('gulp-sass');
var uglify = require('gulp-uglify');
var rename = require('gulp-rename');
var cleanCSS = require('gulp-clean-css');

// Set the browser that you want to support
const AUTOPREFIXER_BROWSERS = [
    'ie >= 10',
    'ie_mob >= 10',
    'ff >= 30',
    'chrome >= 34',
    'safari >= 7',
    'opera >= 23',
    'ios >= 7',
    'android >= 4.4',
    'bb >= 10'
  ];

  // Gulp task to minify CSS files

  gulp.task('css', function () {
    return gulp.src('./src/_includes/scss/*.scss')
      // Compile SASS files
      .pipe(sass({
        outputStyle: 'nested',
        precision: 10,
        includePaths: ['.'],
        onError: console.error.bind(console, 'Sass error:')
      }))
      // Auto-prefix css styles for cross browser compatibility
      .pipe(autoprefixer({browsers: AUTOPREFIXER_BROWSERS}))
      // Minify the file
      .pipe(cleanCSS({level: {1: {specialComments: 0}}}))
      .pipe(rename({ suffix: ".min" }))
      // Output
      .pipe(gulp.dest('./src/_includes/css'))
  });

  
// Gulp task to minify JavaScript files
gulp.task('js', function() {
  return gulp.src("./src/_includes/js/*.js")
    // Minify the file
    .pipe(uglify())
    .pipe(rename({ suffix: ".min" }))
    // Output
    .pipe(gulp.dest("./src/_includes/js/min"))
});


gulp.task('watch', function() {
  gulp.watch("./src/_includes/scss/*.scss", gulp.series('css'));
  gulp.watch("./src/_includes/js/*.js", gulp.series('js'));
});
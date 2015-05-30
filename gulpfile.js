'use strict';

var browserify = require('browserify');
var gulp = require('gulp');
var source = require('vinyl-source-stream');
var buffer = require('vinyl-buffer');
var uglify = require('gulp-uglify');
var sourcemaps = require('gulp-sourcemaps');
var gutil = require('gulp-util');

gulp.task('build', ['build-r','build-d']);

gulp.task('build-r', function () {
  // set up the browserify instance on a task basis
  var b = browserify({
    entries: './main.js',
    debug: true
  });

  return b.bundle()
    .pipe(source('./bin/bundle.min.js'))
    .pipe(buffer())
    .pipe(sourcemaps.init({loadMaps: true}))
        // Add transformation tasks to the pipeline here.
        .pipe(uglify())
        .on('error', gutil.log)
    .pipe(sourcemaps.write('./'))
    .pipe(gulp.dest('./'));
});

gulp.task('build-d', function () {
  // set up the browserify instance on a task basis
  var b = browserify({
    entries: './main.js',
    debug: true
  });

  return b.bundle()
    .pipe(source('./bin/bundle.js'))
    .pipe(buffer())
    .pipe(sourcemaps.init({loadMaps: true}))
        // Add transformation tasks to the pipeline here.
        .on('error', gutil.log)
    .pipe(sourcemaps.write('./'))
    .pipe(gulp.dest('./'));
});

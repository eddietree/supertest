var gulp = require('gulp');
var gutil = require('gulp-util');
var source = require('vinyl-source-stream');
var browserify = require("browserify");
var glob = require("glob");

var dirDst = "../dist";

gulp.task('html', function () {
  return gulp
    .src('index.html')
    .pipe(gulp.dest(dirDst))
});

gulp.task('browserify', function (cb) {
  glob('index.js', {}, function (err, files) {
    var b = browserify();
    files.forEach(function (file) {
      b.add(file);
    });
    b.bundle()
      .pipe(source('index.js'))
      .pipe(gulp.dest(dirDst));
    cb();
  }); 
});

gulp.task('default', ['copy']);
var gulp = require('gulp');
var gutil = require('gulp-util');
var source = require('vinyl-source-stream');
var browserify = require("browserify");
var glob = require("glob");
var runSequence = require('run-sequence');
var browserSync = require('browser-sync');

var dirDst = "../dist";
var reload = browserSync.reload;

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

/*
gulp.task('build', function(callback) {
  runSequence('html',
              ['browserify'],
              callback);
});*/

gulp.task('watch', function(callback) {
  gutil.log("Running Server...");

   browserSync({
    server: {baseDir: dirDst}
  });

    gulp.watch(dirDst+"/*").on('change', reload);

    gulp.watch('*.js', ['browserify']);//.on('change', reload);
    gulp.watch('*.html', ['html']);//.on('change', reload);
});


gulp.task('default', function(callback) {

  runSequence('html',
              ['browserify'],
              'watch',
              callback);
});
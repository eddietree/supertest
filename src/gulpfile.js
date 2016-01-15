var gulp = require('gulp');
var dirDist = "../dist";

gulp.task('copy', function () {
  return gulp
    .src('index.js')
    .pipe(gulp.dest(dirDist))
})

gulp.task('default', ['copy']);
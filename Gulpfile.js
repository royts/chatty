var jshint = require('gulp-jshint'),
gulp = require('gulp');

gulp.task('lint', function () {
  return gulp.src([
    '**/*.js',
    '!node_modules/**/*',
    '!client/js/lib/**/*'
  ])
    .pipe(jshint())
    .pipe(jshint.reporter('default'));
  //.pipe(jshint.reporter('YOUR_REPORTER_HERE'));
});

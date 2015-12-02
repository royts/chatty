var jshint = require('gulp-jshint'),
gulp = require('gulp'),
jshintReporter = require('jshint-stylish'),
concat = require('gulp-concat'),
ngAnnotate = require('gulp-ng-annotate'),
uglify = require('gulp-uglify'),
rename = require('gulp-rename');

gulp.task('lint', function () {
  var filesToLint = [
    '**/*.js',
    '!node_modules/**/*',
    '!client/js/lib/**/*'
  ];
  return gulp.src(filesToLint)
    .pipe(jshint())
    .pipe(jshint.reporter(jshintReporter));
  //.pipe(jshint.reporter('YOUR_REPORTER_HERE'));
});

gulp.task('release', function () {
  var jsFilesToInclude = [
    'client/**/*.js',
    '!client/js/lib/**/*'
  ];

  return gulp.src(jsFilesToInclude)
    .pipe(concat("chatty.js"))
    .pipe(gulp.dest("client/dist/"))
    .pipe(ngAnnotate())
    .pipe(uglify())
    .pipe(rename("chatty.min.js"))
    .pipe(gulp.dest("client/dist/"));
});

gulp.task('release-watch', ["release"], function () {
  var filesToWatch = [
    'client/**/*.js',
    '!client/js/lib/**/*'
  ];

  gulp.watch(filesToWatch, ["release"]);
})

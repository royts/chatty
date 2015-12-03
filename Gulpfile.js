var jshint = require('gulp-jshint'),
gulp = require('gulp'),
jshintReporter = require('jshint-stylish'),
concat = require('gulp-concat'),
ngAnnotate = require('gulp-ng-annotate'),
uglify = require('gulp-uglify'),
rename = require('gulp-rename'),
jade = require('gulp-jade'),
ngHtml2Js = require("gulp-ng-html2js");

gulp.task('lint', function () {
  var filesToLint = [
    '**/*.js',
    '!node_modules/**/*',
    '!client/dist/**/*',
    '!client/lib/**/*'
  ];
  return gulp.src(filesToLint)
    .pipe(jshint())
    .pipe(jshint.reporter(jshintReporter));
  //.pipe(jshint.reporter('YOUR_REPORTER_HERE'));
});

gulp.task('release-js', function () {
  var jsFilesToInclude = [
    'client/**/*.js',
    '!client/dist/**/*',
    '!client/lib/**/*'
  ];

  return gulp.src(jsFilesToInclude)
    .pipe(concat("chatty.js"))
    .pipe(gulp.dest("client/dist/"))
    .pipe(ngAnnotate())
    .pipe(uglify())
    .pipe(rename("chatty.min.js"))
    .pipe(gulp.dest("client/dist/"));
});

gulp.task('release-templates', function () {
  return gulp.src([
    './client/**/*.jade',
    '!client/dist/**/*',
    '!client/lib/**/*'])
    .pipe(jade({}))
    .pipe(ngHtml2Js({
      moduleName: 'chatty.templates'
      //prefix: 'templates-cache/modules/' + base + '/'
    }))
    .pipe(concat('chatty-templates.js'))
    .pipe(gulp.dest("client/dist/"));
});

gulp.task('release', ['release-js', 'release-templates'], function () {
});

gulp.task('release-watch', ['release'], function () {
  var filesToWatch = [
    'client/**/*',
    '!client/dist/**/*',
    '!client/lib/**/*'
  ];

  gulp.watch(filesToWatch, ["release"]);
});

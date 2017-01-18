var gulp = require('gulp'),
  config = require('../gulpconfig'),
  jsconcat = require('gulp-concat'),
  uglify = require('gulp-uglify'),
  jshint = require('gulp-jshint'),
  gulpIf = require('gulp-if'),
  argv = require('yargs').argv,
  production = argv.production;

gulp.task('build:scripts', function () {
  var baseDir = production ? config.paths.dist : config.paths.build;

  gulp.src(config.paths.src.js)
    .pipe(jshint('./.jshintrc'))
    .pipe(jshint.reporter('jshint-stylish'))
    .pipe(jsconcat(config.outputs.files('js')))
    .pipe(gulptIf(production, uglify()))
    .pipe(gulp.dest(baseDir.js));
});
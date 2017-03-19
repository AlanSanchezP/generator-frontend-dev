var gulp = require('gulp'),
  config = require('./gulpconfig'),
  requireDir = require('require-dir'),
  argv = require('yargs').argv,
  production = argv.production,
  buildTasks = [
    'build:bower',
    'build:styles',
    'build:scripts',
    'copy:fonts',
    'copy:images'
  ],
  defaultTasks = [
    'build'
  ];

requireDir('./gulptasks');

if (!production) {
  defaultTasks.push('watch');
}

gulp.task('build', buildTasks);

gulp.task('watch', function () {
  gulp.watch(config.paths.bower(''), ['build:bower']);
  gulp.watch([config.paths.src.styles_all, config.paths.src.svg_files], ['build:styles']);
  gulp.watch(config.paths.src.scripts_all, ['build:scripts']);
  gulp.watch(config.paths.src.fonts, ['copy:fonts']);
  gulp.watch(config.paths.src.img, ['copy:images']);
});



gulp.task('default', defaultTasks);
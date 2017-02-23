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
    'copy:images'<% if (onlyFrontend) { %>,
    'build:html'<% } %>
  ],
  defaultTasks = [
    'build'
  ];

requireDir('./gulptasks');

<% if (onlyFrontend) { %>if (production) {
  buildTasks.push('create:cname');
} else {
  defaultTasks.push('serve', 'watch');
}<% } else { %>if (!production) {
  defaultTasks.push('watch');
}<% } %>

gulp.task('build', buildTasks);

gulp.task('watch', function () {
  gulp.watch(config.paths.bower(''), ['build:bower'<% if (onlyFrontend) { %>, 'server:reload'<% } %>]);
  gulp.watch([config.paths.src.styles_all, config.paths.src.svg_files], ['build:styles'<% if (onlyFrontend) { %>, 'server:reload'<% } %>]);
  gulp.watch(config.paths.src.scripts_all, ['build:scripts'<% if (onlyFrontend) { %>, 'server:reload'<% } %>]);
  gulp.watch(config.paths.src.fonts, ['copy:fonts'<% if (onlyFrontend) { %>, 'server:reload'<% } %>]);
  gulp.watch(config.paths.src.img, ['copy:images'<% if (onlyFrontend) { %>, 'server:reload'<% } %>]);<% if (onlyFrontend) { %>
  gulp.watch(config.paths.src.templates_all, ['build:html', 'server:reload']);<% } %>
});

<% if (onlyFrontend) { %>gulp.task('serve', ['server:run', 'server:reload']);<% } %>

gulp.task('default', defaultTasks);
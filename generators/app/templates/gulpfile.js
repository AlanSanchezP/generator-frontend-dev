var gulp = require('gulp'),
  config = require('./gulpconfig'),
  requireDir = require('require-dir');

requireDir('./gulptasks');

gulp.task('build', [
  'build:bower',
  'build:styles',
  'build:scripts',
  'copy:fonts',
  'copy:images'<% if (onlyFrontend) { %>,
  'build:html'<% } %>
]);

gulp.task('watch', function () {
  gulp.watch(config.paths.bower(''), ['build:bower']);
  gulp.watch([config.paths.src.styles_all, config.paths.src.svg_files], ['build:styles']);
  gulp.watch(config.paths.src.scripts_all, ['build:scripts']);
  gulp.watch(config.paths.src.fonts, ['copy:fonts']);
  gulp.watch(config.paths.src.img, ['copy:images']);
  <% if (onlyFrontend) { %>gulp.watch(config.paths.src.templates_all, ['build:html']);<% } %>
});
<% if (onlyFrontend) { %>
gulp.task('serve', ['server:run', 'server:reload']);
<% } %>
gulp.task('default', ['build',<% if (onlyFrontend) { %> 'serve',<% } %> 'watch']);
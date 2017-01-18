var gulp = require('gulp'),
  config = require('../gulpconfig'),
  portfinder = require('portfinder'),
  connect = require('gulp-connect'),
  tasks = [
    'build:bower',
    'build:html',
    'build:styles',
    'build:scripts',
    'copy:fonts',
    'copy:images'
  ];

portfinder.basePort = 8080;

gulp.task('server:run', function() {
  portfinder.getPort(function (err, availablePort) {
    connect.server({
      port: availablePort,
      root: config.paths.dist.root,
      livereload: true
    });
  });
});

gulp.task('server:reload', tasks, function() {
  gulp.src(config.paths.dist.html)
  .pipe(connect.reload());
})

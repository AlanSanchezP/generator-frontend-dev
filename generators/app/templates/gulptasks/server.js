var gulp = require('gulp'),
  config = require('../gulpconfig'),
  portfinder = require('portfinder'),
  connect = require('gulp-connect'),
  argv = require('yargs').argv,
  production = argv.production,
  tasks = [
    'build:html',
    'build:styles',
    'build:scripts',
    'copy:fonts'
  ];

portfinder.basePort = 8080;

gulp.task('server:run', function() {
  if (production) {
    console.log('ALERT!! Webserver will look for files inside build/ directory, but the latest compiled version is inside dist/ directory. Run gulp command without --production flag.');
  }
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

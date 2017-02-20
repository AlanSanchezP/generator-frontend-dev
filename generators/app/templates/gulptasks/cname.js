var gulp = require('gulp'),
  config = require('../gulpconfig'),
  fs = require('fs');

gulp.task('create:cname', function () {
  try {
    fs.writeFileSync(config.paths.dist.root + '/CNAME', config.etc.domain);
  } catch (e) {
    console.error(e);
  }
});
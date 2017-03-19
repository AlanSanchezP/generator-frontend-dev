'use strict';
var path = require('path'),
  assert = require('yeoman-assert'),
  helpers = require('yeoman-test'),
  fs = require('fs'),
  APP_PATH = '../../generators/app',
  PROJECT_NAME = 'Test project';

describe('generator-frontend-dev:app', function () {
  before(function () {
    return helpers.run(path.join(__dirname, APP_PATH))
      .toPromise();
  });

  it('Creates base files', function () {
    assert.file([
      'README.md',
      '.gitignore',
      'bower.json',
      'package.json',
      '.jshintrc',
      'gulpconfig.js',
      'gulpfile.js',
      'src/js/app.js',
      'src/fonts/.gitkeep',
      'src/img/.gitkeep',
      'src/svg/.gitkeep',
      'src/styl/partials/navbar.styl',
      'src/styl/partials/footer.styl',
      'src/styl/sections/index.styl',
      'src/styl/base.styl',
      'src/styl/fonts.styl',
      'src/styl/main.styl',
      'src/styl/mixins.styl',
      'src/styl/utils.styl',
      'src/styl/vars.styl',
      'gulptasks/bower.js',
      'gulptasks/fonts.js',
      'gulptasks/images.js',
      'gulptasks/scripts.js',
      'gulptasks/styles.js'
    ]);
  });
});
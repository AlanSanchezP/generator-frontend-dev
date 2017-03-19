'use strict';
var path = require('path'),
  assert = require('yeoman-assert'),
  helpers = require('yeoman-test'),
  fs = require('fs'),
  APP_PATH = '../../generators/app',
  PROJECT_NAME = 'Test project',
  ADDITIONAL_TASKS = [
    'src/templates/partials/base.njk',
    'src/templates/partials/footer.njk',
    'src/templates/partials/navbar.njk',
    'src/templates/sections/index.njk',
    'gulptasks/html.js',
    'gulptasks/cname.js',
    'gulptasks/ghpages.js',
    'gulptasks/server.js'
  ];

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

describe('generator-frontend-dev:app', function () {
  before(function () {
    return helpers.run(path.join(__dirname, APP_PATH))
      .withPrompts({
        onlyFrontend: true
      })
      .toPromise();
  });

  it('Creates files for only-frontend projects', function () {
    assert.file(ADDITIONAL_TASKS);
  });
});

describe('generator-frontend-dev:app', function () {
  before(function () {
    return helpers.run(path.join(__dirname, APP_PATH))
      .withPrompts({
        onlyFrontend: false
      })
      .toPromise();
  });

  it('Does not creates additional files for not only-frontend projects', function () {
    assert.noFile(ADDITIONAL_TASKS);
  });
});
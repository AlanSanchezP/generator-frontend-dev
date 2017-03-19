'use strict';
var path = require('path'),
  assert = require('yeoman-assert'),
  helpers = require('yeoman-test'),
  fs = require('fs'),
  APP_PATH = '../../generators/app',
  TEMPLATES_PATH = APP_PATH + '/test_templates/gulpfile_js';

describe('generator-frontend-dev:app', function () {
  before(function () {
    return helpers.run(path.join(__dirname, APP_PATH))
      .withPrompts({
        onlyFrontend: true
      })
      .toPromise();
  });

  it('Creates gulpfile for only-frontend projects', function () {
    var filepath = path.join(__dirname, TEMPLATES_PATH + '/only_frontend.js'),
      content = fs.readFileSync(filepath, { encoding: 'UTF-8' });

    assert.file('gulpfile.js');
    assert.fileContent('gulpfile.js', content);
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

  it('Creates gulpfile for not only-frontend projects', function () {
    var filepath = path.join(__dirname, TEMPLATES_PATH + '/not_only_frontend.js'),
      content = fs.readFileSync(filepath, { encoding: 'UTF-8' });

    assert.file('gulpfile.js');
    assert.fileContent('gulpfile.js', content);
  });
});

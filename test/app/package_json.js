'use strict';
var path = require('path'),
  assert = require('yeoman-assert'),
  helpers = require('yeoman-test'),
  fs = require('fs'),
  config = require('./config'),
  APP_PATH = config.appPath,
  TEMPLATES_PATH = APP_PATH + '/test_templates/package_json',
  PROJECT_NAME = config.projectName;

describe('generator-frontend-dev:app', function () {
  before(function () {
    return helpers.run(path.join(__dirname, APP_PATH))
      .withPrompts({
        name: PROJECT_NAME,
        onlyFrontend: true
      })
      .toPromise();
  });

  it('Creates package.json for only-frontend projects', function () {
    var filepath = path.join(__dirname, TEMPLATES_PATH + '/only_frontend.json'),
      JSONContent = null;

    try {
      JSONContent = JSON.parse(fs.readFileSync(filepath, { encoding: 'UTF-8' }));
    } catch(e) {
      JSONContent = null;
    }

    assert.jsonFileContent('package.json', JSONContent);
  });
});

describe('generator-frontend-dev:app', function () {
  before(function () {
    return helpers.run(path.join(__dirname, APP_PATH))
      .withPrompts({
        name: PROJECT_NAME,
        onlyFrontend: false
      })
      .toPromise();
  });

  it('Creates package.json for not only-frontend projects', function () {
    var filepath = path.join(__dirname, TEMPLATES_PATH + '/not_only_frontend.json'),
      JSONContent = null;

    try {
      JSONContent = JSON.parse(fs.readFileSync(filepath, { encoding: 'UTF-8' }));
    } catch(e) {
      JSONContent = null;
    }

    assert.jsonFileContent('package.json', JSONContent);
    assert.noFileContent('package.json', 'nunjucks');
    assert.noFileContent('package.json', 'gulp-gh-pages');
    assert.noFileContent('package.json', 'gulp-data');
    assert.noFileContent('package.json', 'gulp-nunjucks-render');
    assert.noFileContent('package.json', 'portfinder');
    assert.noFileContent('package.json', 'gulp-connect');
  });
});
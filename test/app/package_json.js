'use strict';
var path = require('path'),
  assert = require('yeoman-assert'),
  helpers = require('yeoman-test'),
  fs = require('fs'),
  APP_PATH = '../../generators/app',
  TEMPLATES_PATH = APP_PATH + '/test_templates/package_json',
  PROJECT_NAME = 'Test project';

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

    console.log(JSONContent);

    assert.file(['package.json']);
    assert.jsonFileContent('package.json', JSONContent);
  });
});
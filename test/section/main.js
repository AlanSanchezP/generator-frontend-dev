var path = require('path'),
  assert = require('yeoman-assert'),
  helpers = require('yeoman-test'),
  latinize = require('latinize'),
  fs = require('fs'),
  APP_PATH = '../../generators/section',
  SECTION_NAME = 'My test section',
  FILENAME = latinize(SECTION_NAME).toLowerCase().replace(/ /g, '_');

describe('generator-frontend-dev:section', function () {
  before(function () {
    return helpers.run(path.join(__dirname, APP_PATH))
      .withPrompts({
        name: SECTION_NAME
      })
      .toPromise();
  });

  it('Creates nunjucks file', function () {
    assert.file('src/templates/sections/' + FILENAME + '.njk');
  });
});

describe('generator-frontend-dev:section', function () {
  before(function () {
    return helpers.run(path.join(__dirname, APP_PATH))
      .withPrompts({
        name: SECTION_NAME,
        stylus: true
      })
      .toPromise();
  });

  it('Creates stylus file when wanted', function () {
    assert.file('src/styl/sections/' + FILENAME + '.styl');
  });
});

describe('generator-frontend-dev:section', function () {
  before(function () {
    return helpers.run(path.join(__dirname, APP_PATH))
      .withPrompts({
        name: SECTION_NAME,
        stylus: false
      })
      .toPromise();
  });

  it('Does not create stylus file when not wanted', function () {
    assert.noFile('src/styl/sections/' + FILENAME + '.styl');
  });
});
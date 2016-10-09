'use strict';
var path = require('path');
var assert = require('yeoman-assert');
var helpers = require('yeoman-test');

describe('generator-prospero:app', function () {
  before(function () {
    return helpers.run(path.join(__dirname, '../generators/app'))
      .withPrompts({appname: 'MyTestProject'})
      .toPromise();
  });

  it('creates files', function () {
    assert.file([
      'MyTestProject/global.json'
    ]);
  });
});

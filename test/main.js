/*global describe, it*/
"use strict";

var should = require("should"),
  through = require("through2"),
  join = require("path").join,
  git = require("../lib/git");

require("mocha");

var filePath = join(__dirname, "./fixtures/*.txt"),
    expectedFile = join(__dirname, "./fixtures/a.txt");

var gutil = require("gulp-util"),
  gulp = require("gulp"),
  gitmodified = require("../");

describe("gulp-gitmodified", function () {

  it("should return a stream", function (done) {
    var stream = gitmodified();
    should.exist(stream.on);
    should.exist(stream.write);
    done();
  });


});

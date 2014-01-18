/*global describe, it*/
"use strict";

var should = require("should"),
  through = require("through2"),
  join = require("path").join,
  git = require("../lib/git");

require("mocha");

var gutil = require("gulp-util"),
  gulp = require("gulp"),
  suffix = require("../");

describe("gulp-gitmodified", function () {

  it("should return a stream", function (done) {
    var stream = suffix();
    should.exist(stream.on);
    should.exist(stream.write);
    done();
  });


});

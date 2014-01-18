/*global describe, it*/
"use strict";

var should = require("should"),
  git = require("../lib/git");

require("mocha");

describe("gulp-gitshasuffix", function () {

  it("should have mockable which and exec", function (done) {
    var fnCalls = 0;
    git.which = function (app, cb) {
      ++fnCalls;
      app.should.equal("git");
      cb();
    };
    git.exec = function (app, args, extra, cb) {
      ++fnCalls;
      app.should.equal("git");
      cb(null, "fbb790d601f7cb0ad0fabe5feff023b02aa9a03d");
    };
    git.getLatestSha(function (err) {
      should(err).equal(null);
      fnCalls.should.equal(2);
      done();
    });
  });

  it("should give error if git is not found on the system", function (done) {
    git.which = function (app, cb) {
      cb(new Error());
    };
    git.exec = function (app, args, extra, cb) {
      cb(null, "");
    };
    git.getLatestSha(function (err, data) {
      should(err.message).equal("git not found on your system.");
      done();
    });
  });

  it("should give error if returned sha is malformed", function (done) {
    git.which = function (app, cb) {
      cb();
    };
    git.exec = function (app, args, extra, cb) {
      cb(null, "SOMETHING NOT A SHA");
    };
    git.getLatestSha(function (err, data) {
      should.exist(err);
      err.message.should.equal("Malformed commit sha or no sha at all returned.");
      done();
    });
  });

  it("should return commit sha if it matches", function (done) {
    git.which = function (app, cb) {
      cb();
    };
    git.exec = function (app, args, extra, cb) {
      cb(null, "fbb790d601f7cb0ad0fabe5feff023b02aa9a03d\n");
    };
    git.getLatestSha(function (err, data) {
      should.not.exist(err);
      should.exist(data);
      data.should.equal("fbb790d601f7cb0ad0fabe5feff023b02aa9a03d");
      done();
    });
  });

});

/*global describe, it*/
"use strict";

var should = require("should"),
  through = require("through2"),
  path = require("path"),
  join = path.join,
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

  it('should suffix folders', function(done) {
    var testSha = "aaabbbcccddd0123456",
        instream = gulp.src(join(__dirname, "./fixtures")),
        outstream = suffix();

    git.getLatestSha = function (cb) {
      return cb(null, testSha);
    };

    outstream.on('data', function(file) {
      should.exist(file);
      should.exist(file.path);
      should.exist(file.relative.indexOf("aaabb") !== -1);
      done();
    });

    instream.pipe(outstream);
  });

  it('should default to - as seperator and the first 6 characters', function(done) {
    var testSha = "fbb790d601f7cb0ad0fabe5feff023b02aa9a03d",
        instream = gulp.src(join(__dirname, "./fixtures")),
        outstream = suffix();

    git.getLatestSha = function (cb) {
      return cb(null, testSha);
    };

    outstream.on('data', function(file) {
      var split = file.relative.split("-");
      should.exist(file);
      should.exist(file.path);
      should.exist(split);
      should.exist(split[1]);
      split.length.should.equal(2);
      split[1].should.equal(testSha.substring(0, 6));
      done();
    });

    instream.pipe(outstream);
  });

  it('should take suffix length as argument', function(done) {
    var testSha = "fbb790d601f7cb0ad0fabe5feff023b02aa9a03d",
        length = 8,
        instream = gulp.src(join(__dirname, "./fixtures")),
        outstream = suffix(length);

    git.getLatestSha = function (cb) {
      return cb(null, testSha);
    };

    outstream.on('data', function(file) {
      var split = file.relative.split("-");
      should.exist(file);
      should.exist(file.path);
      should.exist(split);
      should.exist(split[1]);
      split.length.should.equal(2);
      split[1].length.should.equal(length);
      split[1].should.equal(testSha.substring(0, length));
      done();
    });

    instream.pipe(outstream);
  });

  it('should take seperator as argument', function(done) {
    var testSha = "fbb790d601f7cb0ad0fabe5feff023b02aa9a03d",
        seperator = "***",
        instream = gulp.src(join(__dirname, "./fixtures")),
        outstream = suffix(6, seperator);

    git.getLatestSha = function (cb) {
      return cb(null, testSha);
    };

    outstream.on('data', function(file) {
      should.exist(file.relative.indexOf(seperator) !== -1);
      var split = file.relative.split(seperator);
      should.exist(file);
      should.exist(file.path);
      should.exist(split);
      should.exist(split[1]);
      split.length.should.equal(2);
      split[1].should.equal(testSha.substring(0, 6));
      done();
    });

    instream.pipe(outstream);
  });

  it('should set suffix on all files', function(done) {
    var testSha = "fbb790d601f7cb0ad0fabe5feff023b02aa9a03d",
        seperator = "***",
        instream = gulp.src(join(__dirname, "./fixtures/*")),
        outstream = suffix(6, seperator);

    git.getLatestSha = function (cb) {
      return cb(null, testSha);
    };

    outstream.on('data', function(file) {
      var ext = path.extname(file.path);
      should.exist(file.relative.indexOf(seperator) !== -1);
      var split = file.relative.split(seperator);
      should.exist(file);
      should.exist(file.path);
      should.exist(split);
      should.exist(split[1]);
      split.length.should.equal(2);
      split[1].should.equal(testSha.substring(0, 6) + ext);
    });

    outstream.on('end', function () {
      done();
    });

    instream.pipe(outstream);
  });
});

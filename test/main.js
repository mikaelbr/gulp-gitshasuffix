/*global describe, it*/
"use strict";

var should = require("should"),
  through = require("through2"),
  path = require("path"),
  fs = require("fs"),
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
      file.path.should.contain("-aaabb")
      should.exist(file.relative.indexOf("aaabb") !== -1);
      done();
    });

    instream.pipe(outstream);
  });

  it('should default to - as separator and the first 6 characters', function(done) {
    var testSha = "fbb790d601f7cb0ad0fabe5feff023b02aa9a03d",
        instream = gulp.src(join(__dirname, "./fixtures/a.txt")),
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
      split[1].should.equal(testSha.substring(0, 6) + ".txt");
      done();
    });

    instream.pipe(outstream);
  });

  it('should be able to prefix with folder', function(done) {
    var testSha = "fbb790d601f7cb0ad0fabe5feff023b02aa9a03d",
        instream = gulp.src(join(__dirname, "./fixtures/a.txt")),
        outstream = suffix({
          folder: true
        });

    git.getLatestSha = function (cb) {
      return cb(null, testSha);
    };

    outstream.on('data', function(file) {
      should.exist(file);
      should.exist(file.path);
      file.path.should.contain("/" + testSha.substring(0, 6) + "/");
      done();
    });

    instream.pipe(outstream);
  });

  it('should take suffix length as argument', function(done) {
    var testSha = "fbb790d601f7cb0ad0fabe5feff023b02aa9a03d",
        length = 8,
        instream = gulp.src(join(__dirname, "./fixtures/a.txt")),
        outstream = suffix({length: length});

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
      split[1].split(".")[0].length.should.equal(length);
      split[1].should.equal(testSha.substring(0, length) + ".txt");
      done();
    });

    instream.pipe(outstream);
  });

  it('should take separator as argument', function(done) {
    var testSha = "fbb790d601f7cb0ad0fabe5feff023b02aa9a03d",
        separator = "***",
        instream = gulp.src(join(__dirname, "./fixtures/a.txt")),
        outstream = suffix({
          length: 6,
          separator: separator
        });

    git.getLatestSha = function (cb) {
      return cb(null, testSha);
    };

    outstream.on('data', function(file) {
      should.exist(file.relative.indexOf(separator) !== -1);
      var split = file.relative.split(separator);
      should.exist(file);
      should.exist(file.path);
      should.exist(split);
      should.exist(split[1]);
      split.length.should.equal(2);
      split[1].should.equal(testSha.substring(0, 6) + ".txt");
      done();
    });

    instream.pipe(outstream);
  });


  it('should take seperator as argument', function(done) {
    var testSha = "fbb790d601f7cb0ad0fabe5feff023b02aa9a03d",
        separator = "***",
        instream = gulp.src(join(__dirname, "./fixtures/a.txt")),
        outstream = suffix({
          length: 6,
          seperator: separator
        });

    git.getLatestSha = function (cb) {
      return cb(null, testSha);
    };

    outstream.on('data', function(file) {
      should.exist(file.relative.indexOf(separator) !== -1);
      var split = file.relative.split(separator);
      should.exist(file);
      should.exist(file.path);
      should.exist(split);
      should.exist(split[1]);
      split.length.should.equal(2);
      split[1].should.equal(testSha.substring(0, 6) + ".txt");
      done();
    });

    instream.pipe(outstream);
  });

  it('should set suffix on all files', function(done) {
    var testSha = "fbb790d601f7cb0ad0fabe5feff023b02aa9a03d",
        separator = "***",
        instream = gulp.src(join(__dirname, "./fixtures/*")),
        outstream = suffix({
          length: 6,
          separator: separator
        });

    git.getLatestSha = function (cb) {
      return cb(null, testSha);
    };

    outstream.on('data', function(file) {
      var ext = path.extname(file.path);
      should.exist(file.relative.indexOf(separator) !== -1);
      var split = file.relative.split(separator);
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

  it('should handle streamed files', function (done) {
    var expectedFile = new gutil.File({
      path: "test/fixtures/a.txt",
      cwd: "test/",
      base: "test/fixtures/",
      contents: fs.createReadStream(join(__dirname, "/fixtures/a.txt"))
    });
    var testSha = "aaabbbcccddd0123456",
        outstream = suffix();

    git.getLatestSha = function (cb) {
      return cb(null, testSha);
    };

    outstream.on('data', function(file) {
      should.exist(file);
      should.exist(file.path);
      should.exist(file.isStream());
      should(file.isNull()).not.equal(true);
      file.contents.should.equal(expectedFile.contents);
      should.exist(file.relative.indexOf("aaabb") !== -1);
      done();
    });
    outstream.write(expectedFile);
  });

  it('should remember old base and path', function (done) {
    var origPath = "test/fixtures/a.txt";
    var origBase = "test/fixtures/";

    var expectedFile = new gutil.File({
      path: origPath,
      cwd: "test/",
      base: origBase,
      contents: fs.createReadStream(join(__dirname, "/fixtures/a.txt"))
    });
    var testSha = "aaabbbcccddd0123456",
        outstream = suffix();

    git.getLatestSha = function (cb) {
      return cb(null, testSha);
    };

    outstream.on('data', function(file) {
      should.exist(file);
      should.exist(file.path);
      should.exist(file.isStream());
      should(file.isNull()).not.equal(true);
      file.contents.should.equal(expectedFile.contents);
      should.exist(file.relative.indexOf("aaabb") !== -1);
      file.revOrigPath.should.equal(origPath);
      file.revOrigBase.should.equal(origBase);
      done();
    });
    outstream.write(expectedFile);
  });
});

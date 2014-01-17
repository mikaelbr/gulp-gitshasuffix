var through = require("through2"),
  find = require("lodash.find"),
  gutil = require("gulp-util"),
  path = require("path"),
  git = require("./lib/git");

module.exports = function (length, seperator) {
  "use strict";

  var sha = null;

  length = length || 6;
  seperator = seperator || "-";

  var gitshasuffix = function (file, enc, callback) {
    // helper variables
    var relativePath = path.relative(file.cwd, file.path),
            dir = path.dirname(relativePath),
            firstname = file.path.substr(file.path.indexOf(".", 1)),
            ext = file.path.substr(file.path.lastIndexOf(".")),
            finalName = "";
    var stream = this;

    if (file.isNull()) {
      return callback();
    }
    if (file.isStream()) {
      this.emit('error', new gutil.PluginError('gulp-gitshasuffix', 'Stream content is not supported'));
      return callback();
    }

    var appendSuffix = function () {
      file.path = path.join(dir, path.basename(file.path, firstname) + seperator + sha.substring(0, length) + ext);
      stream.push(file);
      return callback();
    };

    if (!!sha) {
      return appendSuffix();
    }
    git.getLatestSha(function (err, latestSha) {
      if (err) {
        stream.emit('error', new gutil.PluginError('gulp-gitshasuffix', err));
        return callback();
      }
      sha = latestSha;
      appendSuffix();
    });
  }

  return through.obj(gitshasuffix, function (callback) {
    sha = null;
    return callback();
  });
};

var through = require("through2"),
  gutil = require("gulp-util"),
  path = require("path"),
  git = require("./lib/git");

module.exports = function (options) {
  "use strict";

  var sha = null;

  options = options || {};
  var length = options.length || 6;
  var separator = options.separator || options.seperator || "-";
  var folder = !!options.folder;

  var gitshasuffix = function (file, enc, callback) {
    var stream = this,
        dir = path.dirname(file.path),
        ext = path.extname(file.relative),
        firstname = path.basename(file.relative, ext),
        finalname = null;

    var appendSuffix = function () {
      var shaSuffix = sha.substring(0, length),
          finalSuffix = separator + shaSuffix;

      if (file.isNull()) {
        file.path = file.path + finalSuffix;
        stream.push(file);
        return callback();
      }

      if (folder) {
        dir = path.join(dir, shaSuffix);
        finalSuffix = '';
      }

      file.revOrigPath = file.path;
      file.revOrigBase = file.base;
      file.path = path.join(dir, firstname + finalSuffix + ext);
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

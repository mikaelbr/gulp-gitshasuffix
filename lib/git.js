var exec = require("child_process").execFile,
  which = require("which");

var gitApp = 'git',
    gitExtra = {env: process.env};

var Git = function () { };

Git.prototype.exec = function (app, args, extra, cb) {
  return exec(app, args, extra, cb);
};

Git.prototype.which = function (app, cb) {
  return which(app, cb);
};

Git.prototype.getLatestSha = function (cb) {
  var that = this;
  that.which(gitApp, function (err) {
    if (err) {
      return cb(new Error('git not found on your system.'))
    }
    that.exec(gitApp, [ "rev-parse", "HEAD" ], gitExtra, function (err, stdout, stderr) {
      if (err) {
        return cb(new Error('Could not get git status --porcelain'));
      }
      return cb(null, stdout.trim());
    });
  });
};

module.exports = new Git();

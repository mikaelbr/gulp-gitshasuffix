var gulp = require("gulp"),
    through = require('through2'),
    suffix = require("../");

gulp.task("foo", function () {
  var data = gulp.src(["../index.js"])
    .pipe(through.obj(function (file, enc, cb) {
      this.push(file);
      return cb();
    }))
    .pipe(suffix())
    .on('error', function (err) {
      console.log(err);
    })
    .pipe(through.obj(function (file, enc, cb) {
      console.log("Modified: ", file.relative);
      this.push(file);
      return cb()
    }));
});

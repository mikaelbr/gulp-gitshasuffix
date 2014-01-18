var gulp = require("gulp"),
    through = require('through2'),
    suffix = require("../");

gulp.task("foo", function () {
  var data = gulp.src(["../test/**", "../*.js"])
    .pipe(suffix())
    .on('error', function (err) {
      console.log(err);
    })
    .pipe(through.obj(function (file, enc, cb) {
      console.log("Modified: ", file.path);
      this.push(file);
      return cb()
    }));
});

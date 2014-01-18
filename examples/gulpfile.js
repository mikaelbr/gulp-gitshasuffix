var gulp = require("gulp"),
    through = require('through2'),
    suffix = require("../");

gulp.task("default", function () {
  var data = gulp.src(["../test/fixtures/*"])
    .pipe(suffix())
    .on('error', function (err) {
      console.log(err);
    })
    .pipe(through.obj(function (file, enc, cb) {
      console.log("New path: ", file.path);
      this.push(file);
      return cb()
    }));
});

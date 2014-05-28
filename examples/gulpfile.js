var gulp = require("gulp"),
    through = require('through2'),
    suffix = require("../");

var wrap = function (stream) {
  stream.on('error', function (err) {
    console.log(err);
  })
  .pipe(through.obj(function (file, enc, cb) {
    console.log("New path: ", file.path);
    this.push(file);
    return cb()
  }));
}

gulp.task("default", function () {
  wrap(gulp.src(["../test/fixtures/*"])
    .pipe(suffix()))
});

gulp.task("folder", function () {
  wrap(gulp.src(["../test/fixtures"])
    .pipe(suffix()))
});

gulp.task("folderPrefix", function () {
  wrap(gulp.src(["../test/fixtures/*"])
    .pipe(suffix({ folder: true })))
});

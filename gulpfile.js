

var gulp = require('gulp');



gulp.task('default', function () {

  var stream = gulp.src( ['**/*.js', '!./node_modules/**']);
  stream.on('data', function (file) {
    console.log("Data: ", file.relative);
  })

});

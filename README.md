# gulp-gitshasuffix
[![NPM version][npm-image]][npm-url] [![Build Status][travis-image]][travis-url] [![Dependency Status][depstat-image]][depstat-url]

> gitshasuffix plugin for [gulp](https://github.com/gulpjs/gulp)

## Usage

A plugin for Gulp to suffix files with latest commit sha.

First, install `gulp-gitshasuffix` as a development dependency:

```shell
npm install --save-dev gulp-gitshasuffix
```

Then, add it to your `gulpfile.js`:

```javascript
var gitshasuffix = require("gulp-gitshasuffix");

var files = gulp.src("./src/*.ext")
	.pipe(gitshasuffix(6, "-"))

files.on('data', function (file) {
  console.log("Modified file:", file);
});
```

## API

### gitshasuffix(length, seperator)

#### length
Type: `Integer`  
Default: 6

Length of the sha to show.

#### seperator
Type: `String`  
Default: "-"

Seperator before the suffix

## License

[MIT License](http://en.wikipedia.org/wiki/MIT_License)

[npm-url]: https://npmjs.org/package/gulp-gitshasuffix
[npm-image]: https://badge.fury.io/js/gulp-gitshasuffix.png

[travis-url]: http://travis-ci.org/mikaelbr/gulp-gitshasuffix
[travis-image]: https://secure.travis-ci.org/mikaelbr/gulp-gitshasuffix.png?branch=master

[depstat-url]: https://david-dm.org/mikaelbr/gulp-gitshasuffix
[depstat-image]: https://david-dm.org/mikaelbr/gulp-gitshasuffix.png

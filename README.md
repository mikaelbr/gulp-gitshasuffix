# gulp-gitshasuffix
[![NPM version][npm-image]][npm-url] [![Build Status][travis-image]][travis-url] [![Dependency Status][depstat-image]][depstat-url]

> gitshasuffix plugin for [gulp](https://github.com/gulpjs/gulp)

## Usage

A plugin for Gulp to suffix files with latest commit sha. 

E.g. Use instead of having timestamps on compiled files to avoid caching (versioning).

Whereas [gulp-rev](https://github.com/sindresorhus/gulp-rev) sets a hash based on content,
this uses the sha hash from the latest git commit.

First, install `gulp-gitshasuffix` as a development dependency:

```shell
npm install --save-dev gulp-gitshasuffix
```

Then, add it to your `gulpfile.js`:

```javascript
var gitshasuffix = require("gulp-gitshasuffix");

var files = gulp.src("./src/*.ext")
	.pipe(gitshasuffix(6, "-"))

files.on('data', function (file){
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

Seperator before the suffix.


## Examples

To see all examples run from root:

```sh
$ gulp --gulpfile examples/gulpfile.js --tasks
[gulp] Using file /Users/example/gulp-gitshasuffix/examples/gulpfile.js
[gulp] Working directory changed to /Users/example/gulp-gitshasuffix/examples
[gulp] Tasks for /Users/example/gulp-gitshasuffix/examples/gulpfile.js
[gulp] └── default
```

Run example:

```sh
$ gulp --gulpfile examples/gulpfile.js
[gulp] Using file /Users/example/gulp-gitshasuffix/examples/gulpfile.js
[gulp] Working directory changed to /Users/example/gulp-gitshasuffix/examples
[gulp] Running 'default'...
[gulp] Finished 'default' in 4.43 ms
New path:  /Users/example/gulp-gitshasuffix/test/fixtures/a-eaa51c.txt
New path:  /Users/example/gulp-gitshasuffix/test/fixtures/b-eaa51c.txt
New path:  /Users/example/gulp-gitshasuffix/test/fixtures/c-eaa51c.txt
```

## License

[MIT License](http://en.wikipedia.org/wiki/MIT_License)

[npm-url]: https://npmjs.org/package/gulp-gitshasuffix
[npm-image]: https://badge.fury.io/js/gulp-gitshasuffix.png

[travis-url]: http://travis-ci.org/mikaelbr/gulp-gitshasuffix
[travis-image]: https://secure.travis-ci.org/mikaelbr/gulp-gitshasuffix.png?branch=master

[depstat-url]: https://david-dm.org/mikaelbr/gulp-gitshasuffix
[depstat-image]: https://david-dm.org/mikaelbr/gulp-gitshasuffix.png

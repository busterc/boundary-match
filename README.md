# boundary-match [![NPM version][npm-image]][npm-url] [![Build Status][travis-image]][travis-url] [![Dependency Status][daviddm-image]][daviddm-url] [![Coverage percentage][coveralls-image]][coveralls-url]

> Regex string match that honors boundaries for targets prepended and/or appended with non-word characters.

## Installation

```sh
$ npm install --save boundary-match
```

## Usage

```js
const boundaryMatch = require('boundary-match');

boundaryMatch('(HotDog)', '(hotdog)', 'i');
// => [ '(HotDog)', index: 0, input: '(HotDog)' ]

// Q. But Why?
// A. Because, these fail to work as expected:

'(HotDog)'.match(/\b\(hotdog\)\b/i);
// => null
'(HotDog)'.match(new RegExp('\\b\\(hotdog\\)\\b', 'i'));
// => null
```

## API

### `boundaryMatch(string, target[, flags])`

* #### `string`
  * `Required` : `String` the string to be searched.
* #### `target`
  * `Required` : `String` the string to be found. Will be escaped using [`escape-string-regexp`](https://github.com/sindresorhus/escape-string-regexp).
* #### `flags`
  * `Optional` : `String` can have any combination of the following values:
    * `i` : ignore case

## TODO

* [] Implement other native `RegExp` flags: `g`,`u`, `m`, `y`

## FYI

* [https://www.ecma-international.org/ecma-262/8.0/index.html#sec-assertion](https://www.ecma-international.org/ecma-262/8.0/index.html#sec-assertion)

## License

ISC © [Buster Collings](https://about.me/buster)

[npm-image]: https://badge.fury.io/js/boundary-match.svg
[npm-url]: https://npmjs.org/package/boundary-match
[travis-image]: https://travis-ci.org/busterc/boundary-match.svg?branch=master
[travis-url]: https://travis-ci.org/busterc/boundary-match
[daviddm-image]: https://david-dm.org/busterc/boundary-match.svg?theme=shields.io
[daviddm-url]: https://david-dm.org/busterc/boundary-match
[coveralls-image]: https://coveralls.io/repos/busterc/boundary-match/badge.svg
[coveralls-url]: https://coveralls.io/r/busterc/boundary-match

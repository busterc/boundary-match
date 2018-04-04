# boundary-match [![NPM version][npm-image]][npm-url] [![Build Status][travis-image]][travis-url] [![Dependency Status][daviddm-image]][daviddm-url] [![Coverage percentage][coveralls-image]][coveralls-url]

> Regex string match and replace that honors boundaries for targets prepended and/or appended with non-word characters.

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

// When matching isn't enough... `replace`
let matched = boundaryMatch('Gimme a (HotDog)', '(HOTDOG)', 'i');
boundaryMatch.replace(matched, 'Chili Dog!');
// => Gimme a Chili Dog!
```

## API

### `boundaryMatch(string, target[, flags])`

If the `target` is found in the `string`, it returns an `Array` containing the entire matched target as the first element; an `index` property for the start of the match; and an `input` property that contains the entire `string`. If there were no matches, `null` is returned.

* #### `string`
  * `Required` : `String` the string to be searched.
* #### `target`
  * `Required` : `String` the string to be found. Will be escaped using [`escape-string-regexp`](https://github.com/sindresorhus/escape-string-regexp).
* #### `flags`
  * `Optional` : `String` can have any combination of the following values:
    * `i` : ignore case

### `boundaryMatch.replace(match, target)`

Returns a `String` that replaces the found `match` results with `target`

* #### `match`
  * `Required` : `Array` the result of previously calling `boundaryMatch`
* #### `target`
  * `Required` : `String` the string that replaces the found match

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

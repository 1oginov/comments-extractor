# comments-extractor

[![npm](https://img.shields.io/npm/v/comments-extractor)](https://www.npmjs.com/package/comments-extractor)
[![CI](https://github.com/loginov-rocks/comments-extractor/workflows/CI/badge.svg)](https://github.com/loginov-rocks/comments-extractor/actions)
[![Coverage Status](https://coveralls.io/repos/github/loginov-rocks/comments-extractor/badge.svg?branch=main)](https://coveralls.io/github/loginov-rocks/comments-extractor?branch=main)

Extract comments from glob of files, annotated or not.

## Quick Start

### Install

```sh
npm install comments-extractor
```

### Use

```js
const CommentsExtractor = require('comments-extractor');
const extractor = new CommentsExtractor('./**/*.js', 'todo');
const todos = extractor.extract();

console.log(todos);
// Output:
// Map {
//   './example-block.js' => [ { type: 'Block', value: '*\n * @TODO: Write this block.\n ' } ],
//   './example-line.js' => [ { type: 'Line', value: ' @TODO: Write this line.' } ]
// }
```

## API

### `CommentsExtractor`

Comments Extractor class.

**Kind**: global class

* [CommentsExtractor](#commentsextractor)
  * [new CommentsExtractor(pattern, [annotation], [options], [esprimaClass], [fsClass], [globClass])](#new-commentsextractorpattern-annotation-options-esprimaclass-fsclass-globclass)
  * [extract() ⇒ Map.<string, Array>](#extract--mapstring-array)

---

#### `new CommentsExtractor(pattern, [annotation], [options], [esprimaClass], [fsClass], [globClass])`

Comments Extractor constructor.

| Parameter      | Type     | Default   | Description  |
| -------------- | -------- | --------- | ------------ |
| pattern        | `string` |           | Glob pattern |
| [annotation]   | `string` | `''`      | Annotation   |
| [options]      | `Object` | `{}`      | Glob options |
| [esprimaClass] | `*`      | `esprima` |              |
| [fsClass]      | `*`      | `fs`      |              |
| [globClass]    | `*`      | `glob`    |              |

---

#### `extract()` ⇒ `Map.<string, Array>`

Extract comments.

**Kind**: instance method of `CommentsExtractor`

**Returns**: `Map.<string, Array>`, where key is a filepath and value is an array of comments

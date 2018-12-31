# comments-extractor

[![NpmVersion](https://img.shields.io/npm/v/comments-extractor.svg)](https://www.npmjs.com/package/comments-extractor)
[![dependencies Status](https://david-dm.org/loginov-rocks/comments-extractor/status.svg)](https://david-dm.org/loginov-rocks/comments-extractor)
[![devDependencies Status](https://david-dm.org/loginov-rocks/comments-extractor/dev-status.svg)](https://david-dm.org/loginov-rocks/comments-extractor?type=dev)

Extract comments from glob of files, annotated or not.

## Quick start

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
// Outputs:
// Map {
//   './example-block.js' => [ { type: 'Block', value: '*\n * @TODO: Write this block TODO.\n ' } ],
//   './example-line.js' => [ { type: 'Line', value: ' @TODO: Write this line TODO.' } ]
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

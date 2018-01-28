# comments-extractor

[![dependencies Status](https://david-dm.org/1oginov/comments-extractor/status.svg)](https://david-dm.org/1oginov/comments-extractor)
[![devDependencies Status](https://david-dm.org/1oginov/comments-extractor/dev-status.svg)](https://david-dm.org/1oginov/comments-extractor?type=dev)

Extract comments from glob of files, annotated or not.

## Quick Start

Install package:

```sh
npm install comments-extractor
```

Use in code:

```js
const CommentsExtractor = require('comments-extractor');
const extractor = new CommentsExtractor('./**/*.js', 'todo');
const todos = extractor.extract();
// `todos` is a Map containing `file` => `comments` pairs, where `comments`
// is an array of objects containing `type` and `value` properties.
```

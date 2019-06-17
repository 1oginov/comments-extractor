const path = require('path');

const CommentsExtractor = require('./CommentsExtractor');

describe('extract', () => {
  it('returns array of comments mapped to file paths', () => {
    const extractor = new CommentsExtractor(path.resolve(__dirname, '__fixtures__/*.js'), 'todo');
    const todos = extractor.extract();

    const blockComment = {type: 'Block', value: '*\n * @TODO: Write this block.\n '};
    const lineComment = {type: 'Line', value: ' @TODO: Write this line.'};

    const expected = new Map();
    expected.set(path.resolve(__dirname, '__fixtures__/example-block.js'), [blockComment]);
    expected.set(path.resolve(__dirname, '__fixtures__/example-line.js'), [lineComment]);

    expect(todos).toEqual(expected);
  });
});

const assert = require('assert');
const { firstNLines, head } = require('../src/headLib.js');

describe('firstNLines', () => {
  it('Should return given line for one line', () => {
    assert.deepStrictEqual(firstNLines(['hey'], 1), ['hey']);
    assert.deepStrictEqual(firstNLines(['bye'], 1), ['bye']);
  });

  it('should return same when the number of lines is less than 10 ', () => {
    assert.deepStrictEqual(firstNLines(['hey', 'bye'], 2), ['hey', 'bye']);
  });

  it('should return 10 lines when total lines are more than 10', () => {
    let lines = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11'];
    let expected = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10'];
    assert.deepStrictEqual(firstNLines(lines, 10), expected);

    lines = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12'];
    expected = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10'];
    assert.deepStrictEqual(firstNLines(lines, 10), expected);
  });

  it('should return only one line', () => {
    assert.deepStrictEqual(firstNLines(['hey', 'hi'], 1), ['hey']);
  });

  it('should return 11 lines', () => {
    const lines = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '1', '2'];
    const expected = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '1'];
    assert.deepStrictEqual(firstNLines(lines, 11), expected);
  });
});

describe('head', () => {
  it('should return given lines of content', () => {
    assert.deepStrictEqual(head('hi\nhello', { lineCount: 10 }), 'hi\nhello');
  });

  it('should return 10 lines when content has are more than 10 lines', () => {
    const content = '1\n2\n3\n4\n5\n6\n7\n8\n9\n10\n11\n12';
    const expected = '1\n2\n3\n4\n5\n6\n7\n8\n9\n10';
    assert.deepStrictEqual(head(content, { lineCount: 10 }), expected);
  });

  it('should return 1 line', () => {
    assert.deepStrictEqual(head('hello\nbye', { lineCount: 1 }), 'hello');
  });
});

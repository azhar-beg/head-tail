const assert = require('assert');
const { headLines, head } = require('../src/headLib.js');

describe('headLines', () => {
  it('Should return given line for one line', () => {
    assert.deepStrictEqual(headLines(['hey']), ['hey']);
    assert.deepStrictEqual(headLines(['bye']), ['bye']);
  });

  it('should return same when the number of lines is less than 10 ', () => {
    assert.deepStrictEqual(headLines(['hey', 'bye']), ['hey', 'bye']);
  });

  it('should return 10 lines when total lines are more than 10', () => {
    let lines = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11'];
    let expected = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10'];
    assert.deepStrictEqual(headLines(lines), expected);

    lines = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12'];
    expected = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10'];
    assert.deepStrictEqual(headLines(lines), expected);
  });
});

describe('head', () => {
  it('should return given lines of content', () => {
    assert.deepStrictEqual(head('hi\nhello'), 'hi\nhello');
  });

  it('should return 10 lines when content has are more than 10 lines', () => {
    const content = '1\n2\n3\n4\n5\n6\n7\n8\n9\n10\n11\n12';
    const expected = '1\n2\n3\n4\n5\n6\n7\n8\n9\n10';
    assert.deepStrictEqual(head(content), expected);
  });
});

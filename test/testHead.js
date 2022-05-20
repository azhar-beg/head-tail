const assert = require('assert');
const { headLines } = require('../src/head.js');

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

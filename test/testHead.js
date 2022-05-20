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
});

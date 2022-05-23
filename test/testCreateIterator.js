const { createIterator } = require('../src/createIterator');
const assert = require('assert');

describe('createIterator', () => {
  it('Should return first argument for currentArg, index:0', () => {
    const iterator = createIterator([1, 2, 3]);
    assert.deepStrictEqual(iterator.currentArg(), 1);
  });

  it('Should return next argument for iterator.nextArg', () => {
    const iterator = createIterator([1, 2, 3]);
    assert.deepStrictEqual(iterator.nextArg(), 2);
  });

  it('Should return rest of args for iterator.restOfArgs', () => {
    const iterator = createIterator([1, 2, 3]);
    assert.deepStrictEqual(iterator.restOfArgs(), [1, 2, 3]);
  });
});

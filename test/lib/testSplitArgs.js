const assert = require('assert');
const { splitArgs } = require('../../src/lib/splitArgs.js');

describe('splitArgs', () => {
  it('should return give array', () => {
    assert.deepStrictEqual(splitArgs(['-n', '1']), ['-n', '1']);
  });

  it('Should separate number and option', () => {
    assert.deepStrictEqual(splitArgs(['-n4']), ['-n', '4']);
  });

  it('Should add -n by default for -number', () => {
    assert.deepStrictEqual(splitArgs(['-4']), ['-n', '4']);
  });
});

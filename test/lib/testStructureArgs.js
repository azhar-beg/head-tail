const assert = require('assert');
const { structureArgs } = require('../../src/lib/structureArgs.js');

describe('structureArgs', () => {
  it('should return give array', () => {
    assert.deepStrictEqual(structureArgs(['-n', '1']), ['-n', '1']);
  });

  it('Should separate number and option', () => {
    assert.deepStrictEqual(structureArgs(['-n4']), ['-n', '4']);
  });

  it('Should add -n by default for -number', () => {
    assert.deepStrictEqual(structureArgs(['-4']), ['-n', '4']);
  });
});

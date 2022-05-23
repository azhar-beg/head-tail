const assert = require('assert');
const { structureArgs } = require('../src/structureArgs.js');

describe.only('structureArgs', () => {
  it('should return give array', () => {
    assert.deepStrictEqual(structureArgs(['-n', '1']), ['-n', '1']);
  });

  it('Should separate number and option', () => {
    assert.deepStrictEqual(structureArgs(['-n4']), ['-n', '4']);
  });
});

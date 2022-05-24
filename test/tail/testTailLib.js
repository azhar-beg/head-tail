const assert = require('assert');
const { tail } = require('../../src/tail/tailLib.js');

describe('tail', () => {
  it('Should return last give lines', () => {
    let option = '-n';
    let count = '1';
    assert.deepStrictEqual(tail('hello\nhi', { option, count }, '\n'), 'hi');
    option = '-n';
    count = '2';
    assert.deepStrictEqual(tail('hello\nhi', { option, count }, '\n'), 'hello\nhi');
  });

  it('Should return last give characters', () => {
    let option = '-c';
    let count = '1';
    assert.deepStrictEqual(tail('hello\nhi', { option, count }, ''), 'i');
    option = '-c';
    count = '4';
    assert.deepStrictEqual(tail('hello\nhi', { option, count }, ''), 'o\nhi');
  });
});

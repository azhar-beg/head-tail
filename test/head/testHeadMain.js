const { headMain } = require('../../src/head/headMain.js');
const assert = require('assert');

const mockReadFile = (files) => {
  return function (fileName, encoding) {
    assert.equal(encoding, 'utf8');
    try {
      assert.equal(true, Object.keys(files).includes(fileName));
      return files[fileName];
    } catch (err) {
      throw {
        message: `ENOENT: No such file or directory, open '${fileName}'`,
        code: 'ENOENT'
      };
    }
  };
};

const mockConsole = function (input, expectedArgs) {
  let index = 0;
  return function (arg) {
    assert.equal(arg, expectedArgs[index]);
    input.push(arg);
    index++;
  };
};

describe('headMain', () => {
  it('Should print content of single file', () => {
    const errInput = [];
    const outInput = [];
    const outExpected = ['hello'];
    const printOut = mockConsole(outInput, outExpected);
    const printErr = mockConsole(errInput, []);
    const print = { stdOut: printOut, stdErr: printErr };
    const mockedReadFile = mockReadFile({ 'a.txt': 'hello' });
    assert.deepStrictEqual(headMain(print, mockedReadFile, 'a.txt'), 0);
    assert.deepStrictEqual(outInput, outExpected);
  });

  it('Should print content of existing file and error for ba file', () => {
    const errInput = [];
    const outInput = [];
    const errExpected = ['head: a: No such file or directory'];
    const outExpected = ['==> a.txt <==\nhello'];

    const printOut = mockConsole(outInput, outExpected);
    const printErr = mockConsole(errInput, errExpected);

    const print = { stdOut: printOut, stdErr: printErr };

    const mockedReadFile = mockReadFile({ 'a.txt': 'hello' });
    const actual = headMain(print, mockedReadFile, 'a.txt', 'a');
    assert.deepStrictEqual(actual, 1);
    assert.deepStrictEqual(outInput, outExpected);
    assert.deepStrictEqual(errExpected, errInput);
  });

  it('Should print single error with console.error', () => {
    const errInput = [];
    const outInput = [];
    const errExpected = ['head: a: No such file or directory'];
    const outExpected = [];

    const printOut = mockConsole(outInput, outExpected);
    const printErr = mockConsole(errInput, errExpected);

    const print = { stdOut: printOut, stdErr: printErr };

    const mockedReadFile = mockReadFile({ 'a.txt': 'hello' });
    assert.deepStrictEqual(headMain(print, mockedReadFile, 'a'), 1);
    assert.deepStrictEqual(outInput, outExpected);
    assert.deepStrictEqual(errExpected, errInput);
  });
});

const { printHead } = require('../../src/head/headLib.js');
const assert = require('assert');

const mockConsole = function (input, expectedArgs) {
  let index = 0;
  return function (arg) {
    assert.equal(arg, expectedArgs[index]);
    input.push(arg);
    index++;
  };
};

describe('printHead', () => {
  it('should print content of single file', () => {
    const arg = [
      { fileName: 'b.txt', content: 'bye', fileExist: true }
    ];
    const outInput = [];
    const outExpected = ['bye'];
    const printOut = mockConsole(outInput, outExpected);
    const print = { stdOut: printOut };
    printHead(arg, print);
    assert.deepStrictEqual(outInput, outExpected);
  });
  it('should print error for non existing file', () => {
    const arg = [{
      fileExist: false,
      fileName: 'c.txt',
    }];

    const errInput = [];
    const errExpected = ['head: c.txt: No such file or directory'];
    const printErr = mockConsole(errInput, errExpected);
    const print = { stdErr: printErr };
    printHead(arg, print);
    assert.deepStrictEqual(errInput, errExpected);
  });

  it('should print error and content of multiple files', () => {
    const arg = [{
      fileExist: false,
      fileName: 'c.txt',
    },
    {
      fileExist: true,
      fileName: 'a.txt',
      content: 'hello'
    }];

    const outInput = [];
    const outExpected = ['\n==> a.txt <==\nhello'];
    const printOut = mockConsole(outInput, outExpected);
    const errInput = [];
    const errExpected = ['head: c.txt: No such file or directory'];
    const printErr = mockConsole(errInput, errExpected);
    const print = { stdErr: printErr, stdOut: printOut };
    printHead(arg, print);
    assert.deepStrictEqual(errInput, errExpected);
    assert.deepStrictEqual(outInput, outExpected);
  });
});

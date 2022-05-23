const { printHead } = require('../src/printer.js');
const assert = require('assert');

const mockConsole = function (input, expectedArgs) {
  let index = 0;
  return function (arg) {
    assert.equal(arg, expectedArgs[index])
    input.push(arg);
    index++;
  };
};

describe.only('printHead', () => {
  it('Should print content of given file', () => {
    const errInput = [];
    const outInput = [];
    const outExpected = ['hello'];
    const printOut = mockConsole(outInput, outExpected);
    const printErr = mockConsole(errInput, []);
    const content = [{ fileName: './a.txt', extractedContent: 'hello', fileExist: true }];
    assert.deepStrictEqual(printHead(printOut, printErr, content), 0);
    assert.deepStrictEqual(outInput, outExpected);
  });
  it('Should print content of given file and error of bad file', () => {
    const errInput = [];
    const outInput = [];
    const errExpected = ['head: a: No such file or directory'];
    const outExpected = ['==> a.txt <==\nhello'];
    const printOut = mockConsole(outInput, outExpected);
    const printErr = mockConsole(errInput, errExpected);
    const file1 = { fileName: 'a.txt', extractedContent: 'hello', fileExist: true }
    const file2 = { fileName: 'a', fileExist: false }
    const content = [file1, file2];
    assert.deepStrictEqual(printHead(printOut, printErr, content), 1);
    assert.deepStrictEqual(outInput, outExpected);
    assert.deepStrictEqual(errExpected, errInput);
  });
});

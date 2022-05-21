const assert = require('assert');
const { headMain } = require('../src/headLib.js');

const mockReadFile = (files) => {
  return function (fileName, encoding) {
    assert.equal(encoding, 'utf8');
    return files[fileName];
  };
};

describe('headMain', () => {
  it('Should display the lines of given file', () => {
    const mockedReadFile = mockReadFile({ './a.txt': 'hello\nhi' });
    assert.deepStrictEqual(headMain(mockedReadFile, './a.txt'), 'hello\nhi');
  });
  it('should display 1 line of file with 2 lines', () => {
    const mockedReadFile = mockReadFile({ './a.txt': 'hello\nhi' });
    const actual = headMain(mockedReadFile, '-n', '1', './a.txt');
    assert.deepStrictEqual(actual, 'hello');
  });

  it('should display a character of a line', () => {
    const mockedReadFile = mockReadFile({ './a.txt': 'hello\nhi' });
    assert.deepStrictEqual(headMain(mockedReadFile, '-c', '1', './a.txt'), 'h');
  });

  it('should display content of multiple files', () => {
    const mockedReadFile = mockReadFile({ 'a.txt': 'hello', 'b.txt': 'hi' });
    const actual = headMain(mockedReadFile, 'a.txt', 'b.txt');
    const expected = '==> a.txt <==\nhello\n\n==> b.txt <==\nhi';
    assert.deepStrictEqual(actual, expected);
  });
});

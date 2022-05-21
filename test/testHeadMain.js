const assert = require('assert');
const { headMain } = require('../src/headLib.js');

const mockReadFile = (files) => {
  return function (fileName, encoding) {
    assert.equal(encoding, 'utf8');
    assert.equal(true, Object.keys(files).includes(fileName));
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

  it('should display error message for non-existing file', () => {
    const mockedReadFile = mockReadFile({ 'a.txt': 'hey' });
    const actual = headMain(mockedReadFile, 'b.txt');
    assert.deepStrictEqual(actual, 'head: b.txt: No such file or directory');
  });

  it('Should display content of file and error for non existing file', () => {
    const mockedReadFile = mockReadFile({ 'a.txt': 'hey', 'b.txt': 'hi' });
    const actual = headMain(mockedReadFile, 'b.txt', 'c.txt');
    const errorMsg = 'head: c.txt: No such file or directory';
    const expected = `==> b.txt <==\nhi\n\n${errorMsg}`;
    assert.deepStrictEqual(actual, expected);
  });
});

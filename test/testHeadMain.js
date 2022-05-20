const assert = require('assert');
const { headMain } = require('../src/headLib.js');

const mockReadFile = (mockFile, content) => {
  return function (fileName, encoding) {
    assert.equal(mockFile, fileName);
    assert.equal(encoding, 'utf8');
    return content;
  };
};

describe('headMain', () => {
  it('Should display the lines of given file', () => {
    const mockedReadFile = mockReadFile('./a.txt', 'hello\nhi');
    assert.deepStrictEqual(headMain(mockedReadFile, './a.txt'), 'hello\nhi');
  });
  it('should display 1 line of file with 2 lines', () => {
    const mockedReadFile = mockReadFile('./a.txt', 'hello\nhi');
    assert.deepStrictEqual(headMain(mockedReadFile, '-n', '1', './a.txt'), 'hello');
  });

  it('should display a character of a line', () => {
    const mockedReadFile = mockReadFile('./a.txt', 'hello\nhi');
    assert.deepStrictEqual(headMain(mockedReadFile, '-c', '1', './a.txt'), 'h');
  });
});

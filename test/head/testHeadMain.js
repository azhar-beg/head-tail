const assert = require('assert');
const { headMain } = require('../../src/head/headLib.js');

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
    const expected = [{
      fileName: './a.txt', content: 'hello\nhi',
      fileExist: true
    }];
    assert.deepStrictEqual(headMain(mockedReadFile, './a.txt'), expected);
  });
  it('should display 1 line of file with 2 lines', () => {
    const mockedReadFile = mockReadFile({ './a.txt': 'hello\nhi' });
    const expected = [{
      fileName: './a.txt', content: 'hello',
      fileExist: true
    }];
    const actual = headMain(mockedReadFile, '-n', '1', './a.txt');
    assert.deepStrictEqual(actual, expected);
  });

  it('should display a character of a line', () => {
    const mockedReadFile = mockReadFile({ './a.txt': 'hello\nhi' });
    const expected = [{
      fileName: './a.txt', content: 'h',
      fileExist: true
    }];
    const actual = headMain(mockedReadFile, '-c', '1', './a.txt');
    assert.deepStrictEqual(actual, expected);
  });

  it('should display content of multiple files', () => {
    const mockedReadFile = mockReadFile({ 'a.txt': 'hello', 'b.txt': 'hi' });
    const actual = headMain(mockedReadFile, 'a.txt', 'b.txt');
    const expected = [{
      fileName: 'a.txt', content: 'hello',
      fileExist: true
    }, {
      fileName: 'b.txt', content: 'hi',
      fileExist: true
    }];

    assert.deepStrictEqual(actual, expected);
  });

  it('should display error message for non-existing file', () => {
    const mockedReadFile = mockReadFile({ 'a.txt': 'hey' });
    const actual = headMain(mockedReadFile, 'b.txt');
    const expected = [{
      fileExist: false,
      fileName: 'b.txt',
    }];
    assert.deepStrictEqual(actual, expected);
  });

  it('Should display content of file and error for non existing file', () => {
    const mockedReadFile = mockReadFile({ 'a.txt': 'hey', 'b.txt': 'hi' });
    const actual = headMain(mockedReadFile, 'b.txt', 'c.txt');
    const expected = [{
      fileExist: true,
      fileName: 'b.txt',
      content: 'hi'
    }, {
      fileExist: false,
      fileName: 'c.txt',
    }];
    assert.deepStrictEqual(actual, expected);
  });
});

exports.mockReadFile = mockReadFile;

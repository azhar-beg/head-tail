const assert = require('assert');
const { headFiles } = require('../../src/head/headLib.js');

const mockReadFile = (files) => {
  return function (fileName, encoding) {
    try {
      assert.equal(encoding, 'utf8');
      assert.equal(true, Object.keys(files).includes(fileName));
      return files[fileName];
    } catch (err) {
      throw {
        message: `ENOENT: no such file or directory, open '${fileName}'`,
        code: 'ENOENT'
      };
    }
  };
};

describe('headFiles', () => {
  it('Should display the lines of given file', () => {
    const mockedReadFile = mockReadFile({ './a.txt': 'hello\nhi' });
    const expected = [{
      fileName: './a.txt', content: 'hello\nhi',
    }];
    assert.deepStrictEqual(headFiles(mockedReadFile, './a.txt'), expected);
  });

  it('should display 1 line of file with 2 lines', () => {
    const mockedReadFile = mockReadFile({ './a.txt': 'hello\nhi' });
    const expected = [{
      fileName: './a.txt', content: 'hello',
    }];
    const actual = headFiles(mockedReadFile, '-n', '1', './a.txt');
    assert.deepStrictEqual(actual, expected);
  });

  it('should display a character of a line', () => {
    const mockedReadFile = mockReadFile({ './a.txt': 'hello\nhi' });
    const expected = [{
      fileName: './a.txt', content: 'h',
    }];
    const actual = headFiles(mockedReadFile, '-c', '1', './a.txt');
    assert.deepStrictEqual(actual, expected);
  });

  it('should display content of multiple files', () => {
    const mockedReadFile = mockReadFile({ 'a.txt': 'hello', 'b.txt': 'hi' });
    const actual = headFiles(mockedReadFile, 'a.txt', 'b.txt');
    const expected = [{
      fileName: 'a.txt', content: 'hello',
    }, {
      fileName: 'b.txt', content: 'hi',
    }];

    assert.deepStrictEqual(actual, expected);
  });

  it('should display error message for non-existing file', () => {
    const mockedReadFile = mockReadFile({ 'a.txt': 'hey' });
    const actual = headFiles(mockedReadFile, 'b.txt');
    const expected = [{
      fileName: 'b.txt',
      error: 'head: b.txt: no such file or directory'
    }];
    assert.deepStrictEqual(actual, expected);
  });

  it('Should display content of file and error for non existing file', () => {
    const mockedReadFile = mockReadFile({ 'a.txt': 'hey', 'b.txt': 'hi' });
    const actual = headFiles(mockedReadFile, 'b.txt', 'c.txt');
    const expected = [{
      fileName: 'b.txt',
      content: 'hi'
    }, {
      fileName: 'c.txt',
      error: 'head: c.txt: no such file or directory'
    }];
    assert.deepStrictEqual(actual, expected);
  });
});

const assert = require('assert');
const { tailMain, tail } = require('../../src/tail/tailLib.js');

const mockReadFile = (files) => {
  return function (fileName, encoding) {
    assert.equal(encoding, 'utf8');
    assert.equal(true, Object.keys(files).includes(fileName));
    return files[fileName];
  };
};

describe('tailMain', () => {
  it('Should d return content of single file', () => {
    const mockedReadFile = mockReadFile({ './a.txt': 'hello\nhi' });
    const expected = [{
      fileName: './a.txt', content: 'hello\nhi',
      fileExist: true
    }];
    assert.deepStrictEqual(tailMain(mockedReadFile, './a.txt'), expected);
  });

  it('should return content if multiple files', () => {
    const mockedReadFile = mockReadFile({ 'a.txt': 'hello', 'b.txt': 'hi' });
    const actual = tailMain(mockedReadFile, 'a.txt', 'b.txt');
    const expected = [{
      fileName: 'a.txt', content: 'hello',
      fileExist: true
    }, {
      fileName: 'b.txt', content: 'hi',
      fileExist: true
    }];
    assert.deepStrictEqual(actual, expected);
  });
});

const assert = require('assert');
const { tailMain } = require('../../src/tail/tailLib.js');

const mockReadFile = (files) => {
  return function (fileName, encoding) {
    assert.equal(encoding, 'utf8');
    assert.equal(true, Object.keys(files).includes(fileName));
    return files[fileName];
  };
};

describe('tailMain', () => {
  it('Should display the lines of given file', () => {
    const mockedReadFile = mockReadFile({ './a.txt': 'hello\nhi' });
    const expected = [{
      fileName: './a.txt', content: 'hello\nhi',
      fileExist: true
    }];
    assert.deepStrictEqual(tailMain(mockedReadFile, './a.txt'), expected);
  });
});

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
});

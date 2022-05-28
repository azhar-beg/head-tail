const assert = require('assert');
const {
  readFile,
  headFilesContent,
  extractContent,
  head } = require('../../src/head/headLib.js');

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

describe('extractContent', () => {
  it('Should return given line for one line content', () => {
    assert.deepStrictEqual(extractContent(['hey'], 1), ['hey']);
    assert.deepStrictEqual(extractContent(['bye'], 1), ['bye']);
  });

  it('should return same when the number of lines is less than 10 ', () => {
    assert.deepStrictEqual(extractContent(['hey', 'bye'], 2), ['hey', 'bye']);
  });

  it('should return 10 lines when total lines are more than 10', () => {
    const lines = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11'];
    const expected = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10'];
    assert.deepStrictEqual(extractContent(lines, 10), expected);
  });

  it('should return 11 lines', () => {
    const lines = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '1', '2'];
    const expected = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '1'];
    assert.deepStrictEqual(extractContent(lines, 11), expected);
  });
});

describe('head', () => {
  it('should return given lines of content', () => {
    const options = { option: '-n', count: 10 };
    assert.deepStrictEqual(head('hi\nhello', options, '\n'), 'hi\nhello');
  });

  it('should return 10 lines when content has more than 10 lines', () => {
    const options = { option: '-n', count: 10 };
    const content = '1\n2\n3\n4\n5\n6\n7\n8\n9\n10\n11\n12';
    const expected = '1\n2\n3\n4\n5\n6\n7\n8\n9\n10';
    assert.deepStrictEqual(head(content, options, '\n'), expected);
  });

  it('should return 1 line', () => {
    const options = { option: '-n', count: 1 };
    assert.deepStrictEqual(head('hello\nbye', options, '\n'), 'hello');
  });

  it('should return a character of line', () => {
    const options = { option: '-c', count: 1 };
    assert.deepStrictEqual(head('hello\nbye', options, ''), 'h');
  });

  it('should return characters of two line', () => {
    const options = { option: '-c', count: 5 };
    assert.deepStrictEqual(head('hey\nbye', options, ''), 'hey\nb');
  });
});

describe('readFile', () => {
  it('Should read a file if when file exist', () => {
    const mockedReadFile = mockReadFile({ 'a.txt': 'hello' });

    const expected = 'hello';

    assert.deepStrictEqual(readFile(mockedReadFile, 'a.txt'), expected);
  });
  it('Should return error message for non existing file', () => {
    const mockedReadFile = mockReadFile({ 'a.txt': 'hello' });

    const expected =
      { code: 'ENOENT' };
    assert.deepStrictEqual(readFile(mockedReadFile, 'b.txt'), expected);
  });
});

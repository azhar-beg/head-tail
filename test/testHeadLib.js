const assert = require('assert');
const { formatContent, headMultipleFiles, extractContent, head } = require('../src/headLib.js');

describe('extractContent', () => {
  it('Should return given line for one line', () => {
    assert.deepStrictEqual(extractContent(['hey'], 1), ['hey']);
    assert.deepStrictEqual(extractContent(['bye'], 1), ['bye']);
  });

  it('should return same when the number of lines is less than 10 ', () => {
    assert.deepStrictEqual(extractContent(['hey', 'bye'], 2), ['hey', 'bye']);
  });

  it('should return 10 lines when total lines are more than 10', () => {
    let lines = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11'];
    let expected = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10'];
    assert.deepStrictEqual(extractContent(lines, 10), expected);

    lines = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12'];
    expected = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10'];
    assert.deepStrictEqual(extractContent(lines, 10), expected);
  });

  it('should return only one line', () => {
    assert.deepStrictEqual(extractContent(['hey', 'hi'], 1), ['hey']);
  });

  it('should return 11 lines', () => {
    const lines = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '1', '2'];
    const expected = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '1'];
    assert.deepStrictEqual(extractContent(lines, 11), expected);
  });
});

describe('head', () => {
  it('should return given lines of content', () => {
    const options = { option: 'number', count: 10 };
    assert.deepStrictEqual(head('hi\nhello', options), 'hi\nhello');
  });

  it('should return 10 lines when content has are more than 10 lines', () => {
    const options = { option: 'number', count: 10 };
    const content = '1\n2\n3\n4\n5\n6\n7\n8\n9\n10\n11\n12';
    const expected = '1\n2\n3\n4\n5\n6\n7\n8\n9\n10';
    assert.deepStrictEqual(head(content, options), expected);
  });

  it('should return 1 line', () => {
    const options = { option: 'number', count: 1 };
    assert.deepStrictEqual(head('hello\nbye', options), 'hello');
  });

  it('should return a character of line', () => {
    const options = { option: 'character', count: 1 };
    assert.deepStrictEqual(head('hello\nbye', options), 'h');
  });

  it('should return characters of two line', () => {
    const options = { option: 'character', count: 5 };
    assert.deepStrictEqual(head('hey\nbye', options), 'hey\nb');
  });
});

describe('headMultipleFiles', () => {
  it('should head multiple file content', () => {
    const expected = '==> a.txt <==\nhello\n\n==> b.txt <==\nbye';
    const file1 = { fileName: 'a.txt', content: 'hello' };
    const file2 = { fileName: 'b.txt', content: 'bye' };
    const filesContent = [file1, file2];
    const subArgs = { option: 'number', count: '10' }
    assert.deepStrictEqual(headMultipleFiles(filesContent, subArgs), expected);
  });

  it('should head content of single file', () => {
    const content = { fileName: 'b.txt', content: 'bye' };
    const subArgs = { option: 'number', count: '10' }
    assert.deepStrictEqual(headMultipleFiles([content], subArgs), 'bye');
  });
});

describe('formatContent', () => {
  it('Should format extracted content of single file', () => {
    const content = [{ fileName: 'a.txt', extractedContent: 'hello' }];
    assert.deepStrictEqual(formatContent(content), 'hello');
  });

  it('Should format extracted content of multiple files', () => {
    const file1 = { fileName: 'a.txt', extractedContent: 'hello' };
    const file2 = { fileName: 'b.txt', extractedContent: 'bye' }
    const content = [file1, file2];
    const expected = '==> a.txt <==\nhello\n\n==> b.txt <==\nbye';
    assert.deepStrictEqual(formatContent(content), expected);
  });
});

const assert = require('assert');
const { structureTail, tailMultipleFiles } = require('../../src/tail/tailLib.js');

describe('structureTail', () => {
  const expected = {
    fileName: 'a.txt',
    fileExist: true,
    content: 'bye'
  };
  const file = { fileName: 'a.txt', fileExist: true, fileContent: 'bye' };
  it('Should structureTail for given files data', () => {
    assert.deepStrictEqual(structureTail(file, { count: 10 }, '\n'), expected);
  });
});

describe('tailMultipleFiles', () => {
  it('should tail multiple file content', () => {
    const expected = [
      { fileName: 'b.txt', content: 'bye', fileExist: true }
    ];
    const file = { fileName: 'b.txt', fileContent: 'bye', fileExist: true };
    const filesContent = [file];
    const subArgs = { option: '-n', count: '10' };
    assert.deepStrictEqual(tailMultipleFiles(filesContent, subArgs), expected);
  });

  it('Should tail one line of every file', () => {
    const expected = [{
      fileName: 'a.txt', content: 'hi',
      fileExist: true
    },
    { fileName: 'b.txt', content: 'hey', fileExist: true }
    ];
    const file1 = { fileName: 'a.txt', fileContent: 'he\nhi', fileExist: true };
    const file2 = { fileName: 'b.txt', fileContent: 'h\nhey', fileExist: true };
    const filesContent = [file1, file2];
    const subArgs = { option: '-n', count: '1' };
    assert.deepStrictEqual(tailMultipleFiles(filesContent, subArgs), expected);
  });

  it('Shouldn\'t tail non existing file', () => {
    const expected = [{
      fileName: 'a.txt',
      fileExist: false
    },
    ];
    const file1 = { fileName: 'a.txt', fileExist: false };
    const filesContent = [file1];
    const subArgs = { option: '-n', count: '1' };
    assert.deepStrictEqual(tailMultipleFiles(filesContent, subArgs), expected);
  });
});

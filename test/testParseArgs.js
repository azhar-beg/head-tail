const assert = require('assert');
const { parseArgs } = require('../src/parseArgs.js');

describe('parseArgs', () => {
  it('should parse args only for file name.', () => {
    const subArgs = { option: 'number', count: 10 };
    const parsedArgs = { fileNames: ['./a.txt'], subArgs: subArgs };
    assert.deepStrictEqual(parseArgs(['./a.txt']), parsedArgs);
  });

  it('should parse args for filename and number option', () => {
    const args = ['-n', '2', './a.txt'];
    const subArgs = { option: 'number', count: 2 };
    const parsedArgs = { fileNames: ['./a.txt'], subArgs: subArgs };
    assert.deepStrictEqual(parseArgs(args), parsedArgs);
  });

  it('should parse args for character option', () => {
    const args = ['-c', '2', './a.txt'];
    const subArgs = { option: 'character', count: 2 };
    const parsedArgs = { fileNames: ['./a.txt'], subArgs: subArgs };
    assert.deepStrictEqual(parseArgs(args), parsedArgs);
  });

  it('should return multiple file names', () => {
    const args = ['./a.txt', './b.txt'];
    const subArgs = { option: 'number', count: 10 };
    const parsedArgs = { fileNames: ['./a.txt', './b.txt'], subArgs: subArgs };
    assert.deepStrictEqual(parseArgs(args), parsedArgs);
  });

  it('should return last option', () => {
    const args = ['-c', '1', '-c', '4', './a.txt'];
    const subArgs = { option: 'character', count: 4 };
    const parsedArgs = { fileNames: ['./a.txt'], subArgs: subArgs };
    assert.deepStrictEqual(parseArgs(args), parsedArgs);
  });

  it('should throw error for invalid command', () => {
    assert.throws(() => parseArgs(['-c', '4', '-n', '5', './a.txt']), {
      name: 'head: can\'t combine line and byte counts'
    });
  });

});

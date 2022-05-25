const assert = require('assert');
const { parseArgs, countParser } = require('../../src/lib/parseArgs.js');
const { assertCountValidity } = require('../../src/lib/validate.js');
describe.only('parseArgs', () => {
  it.only('should parse args only for file name.', () => {
    const allOptions = [
      {
        flag: '-n',
        noValue: false,
        parser: countParser,
        validate: assertCountValidity
      },
    ];
    const options = { flag: '-n', count: 10 };
    const parsedArgs = { files: ['./a.txt'], option: options };
    const actual = parseArgs(['./a.txt'], allOptions, options);
    assert.deepStrictEqual(actual, parsedArgs);
  });

  it('should parse args for filename and number option', () => {
    const allOptions = [
      {
        flag: '-n',
        noValue: false,
        validate: assertCountValidity
      },
    ];
    const args = ['-n', '2', './a.txt'];
    const options = { flag: '-n', count: 2 };
    const parsedArgs = { files: ['./a.txt'], option: options };
    const defaultOption = { flag: '-n', count: 10 };
    const actual = parseArgs(args, allOptions, defaultOption);
    assert.deepStrictEqual(actual, parsedArgs);
  });

  it('should parse args for character option', () => {
    const args = ['-c', '2', './a.txt'];
    const allOptions = [
      {
        flag: '-n',
        noValue: false,
        validate: assertCountValidity
      },
      {
        flag: '-c',
        noValue: false,
        validate: assertCountValidity
      },
    ];
    const options = { flag: '-c', count: 2 };
    const parsedArgs = { files: ['./a.txt'], option: options };
    const defaultOption = { flag: '-n', count: 10 };
    const actual = parseArgs(args, allOptions, defaultOption);
    assert.deepStrictEqual(actual, parsedArgs);
  });

  it('should return multiple file names', () => {
    const args = ['./a.txt', './b.txt'];
    const options = { option: '-n', count: 10 };
    const parsedArgs = { fileNames: ['./a.txt', './b.txt'], options: options };
    assert.deepStrictEqual(parseArgs(args), parsedArgs);
  });

  it('should return last option', () => {
    const args = ['-c', '1', '-c', '4', './a.txt'];
    const options = { option: '-c', count: 4 };
    const parsedArgs = { fileNames: ['./a.txt'], options: options };
    assert.deepStrictEqual(parseArgs(args), parsedArgs);
  });

  it('Should throw error for -c and -n together', () => {
    assert.throws(() => parseArgs(['-c', '4', '-n', '5', './a.txt']), {
      message: 'head: can\'t combine line and byte counts'
    });
  });

  it('Should separate option and count', () => {
    const args = ['-c1', './a.txt'];
    const options = { option: '-c', count: 1 };
    const parsedArgs = { fileNames: ['./a.txt'], options: options };
    assert.deepStrictEqual(parseArgs(args), parsedArgs);
  });

  it('should throw error for invalid count', () => {
    assert.throws(() => parseArgs(['-c', './a.txt']), {
      message: 'head: illegal byte count -- ./a.txt'
    });
  });

  it('Should return -n as default option when only number is provided', () => {
    const args = ['-1', './a.txt'];
    const options = { option: '-n', count: 1 };
    const parsedArgs = { fileNames: ['./a.txt'], options: options };
    assert.deepStrictEqual(parseArgs(args), parsedArgs);
  });
});

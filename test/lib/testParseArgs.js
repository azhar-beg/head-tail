const assert = require('assert');
const { parseArgs, countParser } = require('../../src/lib/parseArgs.js');
const { assertCountValidity } = require('../../src/lib/validate.js');
const allOptions = [
  {
    flag: '-n',
    noValue: false,
    parser: countParser,
    validate: assertCountValidity
  },
  {
    flag: '-c',
    noValue: false,
    parser: countParser,
    validate: assertCountValidity
  },
];
describe('parseArgs', () => {
  it('should parse args only for file name.', () => {
    const options = { flag: '-n', count: 10 };
    const parsedArgs = { files: ['./a.txt'], option: options };
    const actual = parseArgs(['./a.txt'], allOptions, options);
    assert.deepStrictEqual(actual, parsedArgs);
  });

  it('should parse args for filename and number option', () => {
    const args = ['-n', '2', './a.txt'];
    const options = { flag: '-n', count: 2 };
    const parsedArgs = { files: ['./a.txt'], option: options };
    const defaultOption = { flag: '-n', count: 10 };
    const actual = parseArgs(args, allOptions, defaultOption);
    assert.deepStrictEqual(actual, parsedArgs);
  });

  it('should parse args for character option', () => {
    const args = ['-c', '2', './a.txt'];
    const options = { flag: '-c', count: 2 };
    const parsedArgs = { files: ['./a.txt'], option: options };
    const defaultOption = { flag: '-n', count: 10 };
    const actual = parseArgs(args, allOptions, defaultOption);
    assert.deepStrictEqual(actual, parsedArgs);
  });

  it('should return multiple file names', () => {
    const args = ['./a.txt', './b.txt'];
    const defaultOption = { flag: '-n', count: 10 };
    const option = { flag: '-n', count: 10 };
    const parsedArgs = { files: ['./a.txt', './b.txt'], option };
    assert.deepStrictEqual(parseArgs(args, allOptions, defaultOption), parsedArgs);
  });

  it('should return last option', () => {
    const args = ['-c', '1', '-c', '4', './a.txt'];
    const defaultOption = { flag: '-n', count: 10 };
    const option = { flag: '-c', count: 4 };
    const parsedArgs = { files: ['./a.txt'], option };
    assert.deepStrictEqual(parseArgs(args, allOptions, defaultOption), parsedArgs);
  });

  it('Should throw error for -c and -n together', () => {
    const defaultOption = { flag: '-n', count: 10 };
    const actual = () => parseArgs(['-c', '4', '-n', '5', './a.txt'], allOptions, defaultOption);
    assert.throws(actual, {
      message:
        'usage: tail [-F | -f | -r] [-q] [-b # | -c # | -n #] [file ...]'
    });
  });

  it('Should separate option and count', () => {
    const args = ['-c1', './a.txt'];
    const defaultOption = { flag: '-n', count: 10 };
    const option = { flag: '-c', count: 1 };
    const parsedArgs = { files: ['./a.txt'], option };
    assert.deepStrictEqual(parseArgs(args, allOptions, defaultOption), parsedArgs);
  });

  it('should throw error for invalid count', () => {
    const defaultOption = { flag: '-n', count: 10 };
    assert.throws(() => parseArgs(['-c', './a.txt'], allOptions, defaultOption), {
      message: 'tail: illegal offset -- ./a.txt'
    });
  });

  it('Should return -n as default option when only number is provided', () => {
    const args = ['-1', './a.txt'];
    const option = { flag: '-n', count: 1 };
    const defaultOption = { flag: '-n', count: 10 };
    const parsedArgs = { files: ['./a.txt'], option };
    assert.deepStrictEqual(parseArgs(args, allOptions, defaultOption), parsedArgs);
  });
});

const assert = require('assert');
const { parseArgs } = require('../../src/tail/parseTail.js');
const { parsingDetails } = require('../../src/tail/parseTail.js');

describe('parseArgs', () => {
  it('should parse args only for file name.', () => {
    const options = { flag: '-n', count: 10, reverse: false, noHeader: false };
    const parsedArgs = { files: ['./a.txt'], option: options };
    const actual = parseArgs(['./a.txt'], parsingDetails, options);
    assert.deepStrictEqual(actual, parsedArgs);
  });

  it('should parse args for filename and number option', () => {
    const args = ['-n', '2', './a.txt'];
    const options = { flag: '-n', count: 2, reverse: false, noHeader: false };
    const parsedArgs = { files: ['./a.txt'], option: options };
    const actual = parseArgs(args, parsingDetails);
    assert.deepStrictEqual(actual, parsedArgs);
  });

  it('should parse args for character option', () => {
    const args = ['-c', '2', './a.txt'];
    const options = { flag: '-c', count: 2, reverse: false, noHeader: false };
    const parsedArgs = { files: ['./a.txt'], option: options };
    const actual = parseArgs(args, parsingDetails);
    assert.deepStrictEqual(actual, parsedArgs);
  });

  it('should return multiple file names', () => {
    const args = ['./a.txt', './b.txt'];
    const option = { flag: '-n', count: 10, reverse: false, noHeader: false };
    const parsedArgs = { files: ['./a.txt', './b.txt'], option };
    assert.deepStrictEqual(parseArgs(args, parsingDetails), parsedArgs);
  });

  it('Should throw error for -c and -n together', () => {
    const args = ['-c', '4', '-n', '5', './a.txt'];
    const actual = () =>
      parseArgs(args, parsingDetails);

    const expected = {
      message:
        'usage: tail [-F | -f | -r] [-q] [-b # | -c # | -n #] [file ...]'
    };
    assert.throws(actual, expected);
  });

  it('Should separate option and count', () => {
    const args = ['-c1', './a.txt'];
    const option = { flag: '-c', count: 1, reverse: false, noHeader: false };
    const parsedArgs = { files: ['./a.txt'], option };
    const actual = parseArgs(args, parsingDetails);
    assert.deepStrictEqual(actual, parsedArgs);
  });

  it('should throw error for invalid count', () => {
    const actual = () =>
      parseArgs(['-c', './a.txt'], parsingDetails);

    const expected = {
      message: 'tail: illegal offset -- ./a.txt'
    };
    assert.throws(actual, expected);
  });

  it('Should return -n as default option when only number is provided', () => {
    const args = ['-1', './a.txt'];
    const option = { flag: '-n', count: 1, reverse: false, noHeader: false };
    const parsedArgs = { files: ['./a.txt'], option };
    assert.deepStrictEqual(parseArgs(args, parsingDetails), parsedArgs);
  });
});

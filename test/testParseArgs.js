const assert = require('assert');
const { getOptions, parseArgs } = require('../src/parseArgs.js');
const { createIterator } = require('../src/createIterator.js');

describe('parseArgs', () => {
  it('should parse args only for file name.', () => {
    const subArgs = { option: '-n', count: 10 };
    const parsedArgs = { fileNames: ['./a.txt'], subArgs: subArgs };
    assert.deepStrictEqual(parseArgs(['./a.txt']), parsedArgs);
  });

  it('should parse args for filename and number option', () => {
    const args = ['-n', '2', './a.txt'];
    const subArgs = { option: '-n', count: 2 };
    const parsedArgs = { fileNames: ['./a.txt'], subArgs: subArgs };
    assert.deepStrictEqual(parseArgs(args), parsedArgs);
  });

  it('should parse args for character option', () => {
    const args = ['-c', '2', './a.txt'];
    const subArgs = { option: '-c', count: 2 };
    const parsedArgs = { fileNames: ['./a.txt'], subArgs: subArgs };
    assert.deepStrictEqual(parseArgs(args), parsedArgs);
  });

  it('should return multiple file names', () => {
    const args = ['./a.txt', './b.txt'];
    const subArgs = { option: '-n', count: 10 };
    const parsedArgs = { fileNames: ['./a.txt', './b.txt'], subArgs: subArgs };
    assert.deepStrictEqual(parseArgs(args), parsedArgs);
  });

  it('should return last option', () => {
    const args = ['-c', '1', '-c', '4', './a.txt'];
    const subArgs = { option: '-c', count: 4 };
    const parsedArgs = { fileNames: ['./a.txt'], subArgs: subArgs };
    assert.deepStrictEqual(parseArgs(args), parsedArgs);
  });

  it('Should throw error for -c and -n together', () => {
    assert.throws(() => parseArgs(['-c', '4', '-n', '5', './a.txt']), {
      message: 'head: can\'t combine line and byte counts'
    });
  });

  it('Should separate option and count', () => {
    const args = ['-c1', './a.txt'];
    const subArgs = { option: '-c', count: 1 };
    const parsedArgs = { fileNames: ['./a.txt'], subArgs: subArgs };
    assert.deepStrictEqual(parseArgs(args), parsedArgs);
  });

  it('should throw error for invalid count', () => {
    assert.throws(() => parseArgs(['-c', './a.txt']), {
      message: 'head: illegal byte count -- ./a.txt'
    });
  });

  it('Should return -n as default option when only number is provided', () => {
    const args = ['-1', './a.txt'];
    const subArgs = { option: '-n', count: 1 };
    const parsedArgs = { fileNames: ['./a.txt'], subArgs: subArgs };
    assert.deepStrictEqual(parseArgs(args), parsedArgs);
  });
});

describe('getOptions', () => {
  it('Should return -n as default, when number is provided', () => {
    const iterator = createIterator(['-n', '1', 'a.txt']);
    const subArgs = { option: '-n', count: 1 };
    let option;
    assert.deepStrictEqual(getOptions(iterator, option), subArgs);
  });

  it('should throw an error for invalid option', () => {
    const iterator = createIterator(['-w', '1']);
    const message = 'head: illegal option -- w';
    const usage = 'usage: head[-n lines | -c bytes][file ...]';
    const expected = { message: message + '\n' + usage };
    assert.throws(() => getOptions(iterator), expected);
  });

  it('should throw an error for no option argument', () => {
    const iterator = createIterator(['-n']);
    const message = 'head: option requires an argument -- n';
    const usage = 'usage: head[-n lines | -c bytes][file ...]';
    const expected = { message: message + '\n' + usage };
    assert.throws(() => getOptions(iterator), expected);
  });

  it.only('should throw error for no arguments', () => {
    const iterator = createIterator([]);
    const expected = { message: 'usage: head[-n lines | -c bytes][file ...]' };
    assert.throws(() => getOptions(iterator), expected);
  });
});

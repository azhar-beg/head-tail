const assert = require('assert');
const { parseArgs } = require('../src/parseArgs.js');

describe('parseArgs', () => {
  it('should parse args only for file name.', () => {
    const parsedArgs = { fileName: './a.txt', option: 'number', count: 10 };
    assert.deepStrictEqual(parseArgs(['./a.txt']), parsedArgs);
  });

  it('should parse args for filename and option', () => {
    const args = ['-n', 2, './a.txt'];
    const parsedArgs = { fileName: './a.txt', option: 'number', count: 2 };
    assert.deepStrictEqual(parseArgs(args), parsedArgs);
  });

  it('should parse args for character option', () => {
    const args = ['-c', 2, './a.txt'];
    const parsedArgs = { fileName: './a.txt', option: 'character', count: 2 };
    assert.deepStrictEqual(parseArgs(args), parsedArgs);
  });
});

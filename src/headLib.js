const { splitLines, joinLines } = require('./stringUtils.js');
const { parseArgs } = require('./parseArgs.js');
const firstNLines = (lines, lineCount) => lines.slice(0, lineCount);

const head = function (content, count, separator) {
  const lines = splitLines(content, separator);
  const firstLines = firstNLines(lines, count);
  return joinLines(firstLines, separator);
};

const headMain = function (readFile, ...args) {
  const parsedArgs = parseArgs(args);
  const separator = parsedArgs.option === 'character' ? '' : '\n';
  const content = readFile(parsedArgs.fileName, 'utf8');
  return head(content, parsedArgs.count, separator);
};

exports.firstNLines = firstNLines;
exports.head = head;
exports.headMain = headMain;

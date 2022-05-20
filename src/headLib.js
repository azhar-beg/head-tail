const { splitLines, joinLines } = require('./stringUtils.js');
const firstNLines = (lines, lineCount) => lines.slice(0, lineCount);

const head = function (content, { count, separator }) {
  const lines = splitLines(content, separator);
  const firstLines = firstNLines(lines, count);
  return joinLines(firstLines, separator);
};

const headMain = function (readFile, file) {
  const content = readFile(file, 'utf8');
  return head(content, { lineCount: 10 });
};

exports.firstNLines = firstNLines;
exports.head = head;
exports.headMain = headMain;

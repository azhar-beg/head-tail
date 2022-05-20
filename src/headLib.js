const { splitLines, joinLines } = require('./stringUtils.js');
const firstNLines = (lines, lineCount) => lines.slice(0, lineCount);

const head = function (content, { lineCount }) {
  const lines = splitLines(content);
  const firstLines = firstNLines(lines, lineCount);
  return joinLines(firstLines);
};

const headMain = function (readFile, file) {
  const content = readFile(file, 'utf8');
  return head(content, { lineCount: 10 });
};

exports.firstNLines = firstNLines;
exports.head = head;
exports.headMain = headMain;

const { splitLines, joinLines } = require('./line.js');
const headLines = (lines) => lines.slice(0, 10);

const head = function (content) {
  const lines = splitLines(content);
  const firstLines = headLines(lines);
  return joinLines(firstLines);
};

const headMain = function (file, readFile) {
  const content = readFile(file, 'utf8');
  return head(content);
};

exports.headLines = headLines;
exports.head = head;
exports.headMain = headMain;
const headLines = (lines) => lines.slice(0, 10);

const head = function (content) {
  const lines = content.split('\n');
  const firstLines = headLines(lines);
  return firstLines.join('\n');
};

exports.headLines = headLines;
exports.head = head;

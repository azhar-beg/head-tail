const { splitContent, joinContent } = require('../../src/lib/stringUtils.js');

const extractContent = (content, count) => content.slice(-count);

const tail = function (content, { option, count }) {
  const separator = option === '-c' ? '' : '\n';
  const splittedContent = splitContent(content, separator);
  const extractedContent = extractContent(splittedContent, count);
  return joinContent(extractedContent, separator);
};

exports.tail = tail;

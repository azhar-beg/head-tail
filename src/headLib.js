const { splitContent, joinContent } = require('./stringUtils.js');
const { parseArgs } = require('./parseArgs.js');

const extractContent = (content, count) => content.slice(0, count);

const head = function (content, { option, count }) {
  const separator = option === 'character' ? '' : '\n';
  const splittedContent = splitContent(content, separator);
  const extractedContent = extractContent(splittedContent, count);
  return joinContent(extractedContent, separator);
};

const headMain = function (readFile, ...args) {
  const parsedArgs = parseArgs(args);
  const content = readFile(parsedArgs.fileNames[0], 'utf8');
  return head(content, parsedArgs);
};

exports.extractContent = extractContent;
exports.head = head;
exports.headMain = headMain;

const { splitContent, joinContent } = require('./stringUtils.js');
const { parseArgs } = require('./parseArgs.js');

const extractContent = (content, count) => content.slice(0, count);

const head = function (content, { option, count }) {
  const separator = option === 'character' ? '' : '\n';
  const splittedContent = splitContent(content, separator);
  const extractedContent = extractContent(splittedContent, count);
  return joinContent(extractedContent, separator);
};

const headMultipleFiles = function (filesContent, subArgs) {
  const headContent = filesContent.map(({ fileName, content }) => {
    const extractedContent = head(content, subArgs);
    return { fileName, extractedContent };
  });

  if (headContent.length <= 1) {
    return headContent[0].extractedContent;
  }

  return headContent.map(({ fileName, extractedContent }) => {
    return `==> ${fileName} <==\n${extractedContent}`;
  }).join('\n');
};

const headMain = function (readFile, ...args) {
  const { fileNames, subArgs } = parseArgs(args);
  const content = readFile(fileNames[0], 'utf8');
  return head(content, subArgs);
};

exports.extractContent = extractContent;
exports.head = head;
exports.headMain = headMain;
exports.headMultipleFiles = headMultipleFiles;

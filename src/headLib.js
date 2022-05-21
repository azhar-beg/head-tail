const { splitContent, joinContent } = require('./stringUtils.js');
const { parseArgs } = require('./parseArgs.js');

const extractContent = (content, count) => content.slice(0, count);

const head = function (content, { option, count }) {
  const separator = option === 'character' ? '' : '\n';
  const splittedContent = splitContent(content, separator);
  const extractedContent = extractContent(splittedContent, count);
  return joinContent(extractedContent, separator);
};

const formatContent = function (content) {
  if (content.length <= 1) {
    return content[0].extractedContent;
  }
  return content.map(({ fileName, extractedContent }) => {
    return `==> ${fileName} <==\n${extractedContent}`;
  }).join('\n\n');
};

const headMultipleFiles = function (filesContent, subArgs) {
  const headContent = filesContent.map(({ fileName, content }) => {
    const extractedContent = head(content, subArgs);
    return { fileName, extractedContent };
  });

  return formatContent(headContent);
};

const headMain = function (readFile, ...args) {
  const { fileNames, subArgs } = parseArgs(args);
  const filesContent = fileNames.map(fileName => {
    const content = readFile(fileName, 'utf8');
    return { fileName, content };
  });
  return headMultipleFiles(filesContent, subArgs);
};

exports.extractContent = extractContent;
exports.head = head;
exports.headMain = headMain;
exports.headMultipleFiles = headMultipleFiles;
exports.formatContent = formatContent;

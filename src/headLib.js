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
    const message = `head: ${content[0].fileName}: No such file or directory`;
    return content[0].fileExist ? content[0].extractedContent : message;
  }
  return content.map(({ fileName, extractedContent, fileExist }) => {
    if (fileExist) {
      return `==> ${fileName} <==\n${extractedContent}`;
    }
    const message = `head: ${fileName}: No such file or directory`;
    return message;
  }).join('\n\n');
};

const headMultipleFiles = function (filesContent, subArgs) {
  const headContent = filesContent.map(({ fileName, content, fileExist }) => {
    if (fileExist) {
      const extractedContent = head(content, subArgs);
      return { fileName, extractedContent, fileExist };
    }
    return { fileName, fileExist };
  });
  return formatContent(headContent);
};

const headMain = function (readFile, ...args) {
  const { fileNames, subArgs } = parseArgs(args);
  const filesContent = [];
  for (let index = 0; index < fileNames.length; index++) {
    const fileName = fileNames[index];
    try {
      const content = readFile(fileNames[index], 'utf8');
      filesContent.push({ fileName, content, fileExist: true });
    } catch (error) {
      filesContent.push({ fileName, fileExist: false });
    }
  }
  return headMultipleFiles(filesContent, subArgs);
};

exports.extractContent = extractContent;
exports.head = head;
exports.headMain = headMain;
exports.headMultipleFiles = headMultipleFiles;
exports.formatContent = formatContent;

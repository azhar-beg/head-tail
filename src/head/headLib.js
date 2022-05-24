const { splitContent, joinContent } = require('../lib/stringUtils.js');
const { parseArgs } = require('./parseArgs.js');

const extractContent = (content, count) => content.slice(0, count);

const head = function (content, { count }, separator) {
  const splittedContent = splitContent(content, separator);
  const extractedContent = extractContent(splittedContent, count);
  return joinContent(extractedContent, separator);
};

const structureHead = function ({ fileName, content, fileExist }, subArgs, sep) {
  if (fileExist) {
    const extractedContent = head(content, subArgs, sep);
    return { fileName, extractedContent, fileExist };
  }
  return { fileName, fileExist };
};

const headMultipleFiles = function (filesContent, subArgs) {
  const separator = subArgs.option === '-c' ? '' : '\n';
  const headContent = filesContent.map(fileContent => structureHead(
    fileContent, subArgs, separator));
  return headContent;
};

const readFile = function (fileReader, fileName) {
  try {
    const content = fileReader(fileName, 'utf8');
    return { fileName, content, fileExist: true };
  } catch (error) {
    return { fileName, fileExist: false };
  }
};

const headMain = function (fileReader, ...args) {
  const { fileNames, subArgs } = parseArgs(args);
  const filesContent = [];
  for (let index = 0; index < fileNames.length; index++) {
    filesContent.push(readFile(fileReader, fileNames[index]));
  }
  return headMultipleFiles(filesContent, subArgs);
};

exports.extractContent = extractContent;
exports.head = head;
exports.headMain = headMain;
exports.headMultipleFiles = headMultipleFiles;
exports.readFile = readFile;

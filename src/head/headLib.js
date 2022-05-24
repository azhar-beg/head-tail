const { splitContent, joinContent } = require('../lib/stringUtils.js');
const { parseArgs } = require('./parseArgs.js');

const extractContent = (fileContent, count) => fileContent.slice(0, count);

const head = function (fileContent, { count }, separator) {
  const splittedContent = splitContent(fileContent, separator);
  const content = extractContent(splittedContent, count);
  return joinContent(content, separator);
};

const structureHead = function (fileStatus, options, sep) {
  const { fileName, fileContent, fileExist } = fileStatus;
  if (fileExist) {
    const content = head(fileContent, options, sep);
    return { fileName, content, fileExist };
  }
  return { fileName, fileExist };
};

const headMultipleFiles = function (filesStatus, options) {
  const separator = options.option === '-c' ? '' : '\n';
  const headContent = filesStatus.map(fileStatus => structureHead(
    fileStatus, options, separator));
  return headContent;
};

const readFile = function (fileReader, fileName) {
  try {
    const fileContent = fileReader(fileName, 'utf8');
    return { fileName, fileContent, fileExist: true };
  } catch (error) {
    return { fileName, fileExist: false };
  }
};

const headMain = function (fileReader, ...args) {
  const { fileNames, options } = parseArgs(args);
  const filesStatus = [];
  for (let index = 0; index < fileNames.length; index++) {
    filesStatus.push(readFile(fileReader, fileNames[index]));
  }
  return headMultipleFiles(filesStatus, options);
};

exports.extractContent = extractContent;
exports.head = head;
exports.headMain = headMain;
exports.headMultipleFiles = headMultipleFiles;
exports.readFile = readFile;

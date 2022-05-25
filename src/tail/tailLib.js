const { splitContent, joinContent } = require('../../src/lib/stringUtils.js');
const { parseTail } = require('./parseTail');

const extractContent = (content, count) => content.slice(-count);

const getSeparator = ({ flag }) => flag === '-c' ? '' : '\n';

const tail = function (fileContent, { count }, separator) {
  const content = splitContent(fileContent, separator);
  const extractedContent = extractContent(content, count);
  return joinContent(extractedContent, separator);
};

const structureTail = function (fileStatus, options, separator) {
  const { fileName, fileContent, fileExist } = fileStatus;

  if (fileExist) {
    const content = tail(fileContent, options, separator);
    return { fileName, content, fileExist };
  }
  return { fileName, fileExist };
};

const tailMultipleFiles = function (filesStatus, options) {
  const separator = getSeparator(options);
  const headContent = filesStatus.map(fileStatus => structureTail(
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

const tailMain = function (fileReader, ...args) {
  const { files, option } = parseTail(args);
  const filesStatus = [];
  for (let index = 0; index < files.length; index++) {
    filesStatus.push(readFile(fileReader, files[index]));
  }
  const content = tailMultipleFiles(filesStatus, option);
  return content;
};

exports.tail = tail;
exports.tailMultipleFiles = tailMultipleFiles;
exports.structureTail = structureTail;
exports.tailMain = tailMain;

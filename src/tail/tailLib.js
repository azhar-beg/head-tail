const { splitContent, joinContent } = require('../../src/lib/stringUtils.js');

const extractContent = (content, count) => content.slice(-count);

const tail = function (content, { count }, separator) {
  const splittedContent = splitContent(content, separator);
  const extractedContent = extractContent(splittedContent, count);
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
  const separator = options.option === '-c' ? '' : '\n';
  const headContent = filesStatus.map(fileStatus => structureTail(
    fileStatus, options, separator));
  return headContent;
};

exports.tail = tail;
exports.tailMultipleFiles = tailMultipleFiles;
exports.structureTail = structureTail;

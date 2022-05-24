const { splitContent, joinContent } = require('../../src/lib/stringUtils.js');

const extractContent = (content, count) => content.slice(-count);

const getSeparator = ({ option }) => option === '-c' ? '' : '\n';

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
  const separator = getSeparator(options);
  const headContent = filesStatus.map(fileStatus => structureTail(
    fileStatus, options, separator));
  return headContent;
};

const tailMain = function (fileReader, fileName) {
  const fileContent = fileReader(fileName, 'utf8');
  const fileStatus = [{ fileName, fileContent, fileExist: true }];
  const content = tailMultipleFiles(fileStatus, { option: '-n', count: 10 }, '\n');
  return content;
};

exports.tail = tail;
exports.tailMultipleFiles = tailMultipleFiles;
exports.structureTail = structureTail;
exports.tailMain = tailMain;

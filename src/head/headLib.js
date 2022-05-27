const { parseArgs } = require('./parseArgs.js');
const splitContent = (content, separator) => content.split(separator);
const joinContent = (lines, separator) => lines.join(separator);

const errorMsg = file => `head: ${file}: No such file or directory`;

const identity = arg => arg;

const appendHead = (content, fileName, separator) => {
  return `${separator}==> ${fileName} <==\n${content}`;
};

const isOneFile = content => content.length <= 1;

const extractContent = (fileContent, count) => fileContent.slice(0, count);

const head = function (fileContent, { count }, separator) {
  let content = splitContent(fileContent, separator);
  content = extractContent(content, count);
  return joinContent(content, separator);
};

const structureHead = function (fileStatus, options, separator) {
  const { fileName, fileContent, fileExist } = fileStatus;
  if (fileExist) {
    const content = head(fileContent, options, separator);
    return { fileName, content, fileExist };
  }
  return { fileName, fileExist };
};

const headFilesContent = function (filesStatus, options) {
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

const headFiles = function (fileReader, ...args) {
  const { fileNames, options } = parseArgs(args);
  const filesStatus = [];
  for (let index = 0; index < fileNames.length; index++) {
    filesStatus.push(readFile(fileReader, fileNames[index]));
  }
  return headFilesContent(filesStatus, options);
};

const printer = function (fileHead, print, formatter, separator) {
  const { content, fileExist, fileName } = fileHead;
  if (fileExist) {
    print.stdOut(formatter(content, fileName, separator));
    return;
  }
  print.stdErr(errorMsg(fileName));
};

const printHead = function (fileHeads, print) {
  const formatter = isOneFile(fileHeads) ? identity : appendHead;
  let separator = '';
  fileHeads.forEach(fileHead => {
    printer(fileHead, print, formatter, separator);
    separator = '\n';
  });
};

exports.extractContent = extractContent;
exports.head = head;
exports.headFiles = headFiles;
exports.headFilesContent = headFilesContent;
exports.readFile = readFile;
exports.printHead = printHead;

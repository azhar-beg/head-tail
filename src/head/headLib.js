const { read } = require('fs');
const { parseArgs } = require('./parseArgs.js');
const splitContent = (content, separator) => content.split(separator);
const joinContent = (lines, separator) => lines.join(separator);

const identity = arg => arg;

const header = fileName => `==> ${fileName} <==\n`;

const appendHead = (content, fileName, separator) => {
  return separator + header(fileName) + content;
};

const isOneFile = content => content.length <= 1;

const extractContent = (fileContent, count) => fileContent.slice(0, count);

const head = function (fileContent, { count }, separator) {
  let content = splitContent(fileContent, separator);
  content = extractContent(content, count);
  return joinContent(content, separator);
};

const structureHead = function (fileData, options, separator) {
  const { fileName, fileContent } = fileData;
  if (fileContent) {
    const content = head(fileContent, options, separator);
    return { fileName, content };
  }
  return fileData;
};

const getErrorMessage = function (error, fileName) {
  const message = error.message.slice(error.code.length).split(',')[0];
  return `head: ${fileName}` + message;
};

const readFile = function (fileReader, fileName) {
  try {
    const fileContent = fileReader(fileName, 'utf8');
    return { fileContent, fileName };
  } catch (err) {
    const error = getErrorMessage(err, fileName);
    return { error, fileName };
  }
};

const headFile = function (fileName, fileReader, options, separator) {
  const fileData = readFile(fileReader, fileName);
  return structureHead(fileData, options, separator);
};

const headFiles = function (fileReader, ...args) {
  const { fileNames, options } = parseArgs(args);
  const separator = options.option === '-c' ? '' : '\n';
  return fileNames.map(file => headFile(file, fileReader, options, separator));
};

const printer = function (fileHead, print, formatter, separator) {
  const { content, fileName, error } = fileHead;
  if (content) {
    print.stdOut(formatter(content, fileName, separator));
    return;
  }
  print.stdErr(error);
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
exports.headFiles = headFiles; exports.readFile = readFile;
exports.printHead = printHead;

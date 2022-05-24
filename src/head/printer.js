const { headMain } = require('./headLib.js');

const errorMsg = file => `head: ${file}: No such file or directory`;

const formatter = (content, fileName, separator) => {
  return `${separator}==> ${fileName} <==\n${content}`;
};

const print = function (stdOut, stdErr, fileStatus, separator) {
  const { content, fileExist, fileName } = fileStatus;
  if (fileExist) {
    stdOut(formatter(content, fileName, separator));
    return;
  }
  stdErr(errorMsg(fileName));
  this.code = 1;
};

const oneFile = content => content.length <= 1;

const printHead = function (stdOut, stdErr, fileReader, ...args) {
  const filesContent = headMain(fileReader, ...args);
  const exit = { code: 0 };
  if (oneFile(filesContent) && filesContent[0].fileExist) {
    stdOut(filesContent[0].content);
    return exit.code;
  }

  const printer = print.bind(exit, stdOut, stdErr);
  let separator = '';
  filesContent.forEach(content => {
    printer(content, separator);
    separator = '\n';
  });
  return exit.code;
};

exports.printHead = printHead;

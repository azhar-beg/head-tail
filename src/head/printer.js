const { headMain } = require('./headLib.js');

const errorMsg = file => `head: ${file}: No such file or directory`;

const formatter = (content, fileName, separator) => {
  return `${separator}==> ${fileName} <==\n${content}`;
};

const printer = function (print, fileStatus, separator) {
  const { content, fileExist, fileName } = fileStatus;
  if (fileExist) {
    print.stdOut(formatter(content, fileName, separator));
    return;
  }
  print.stdErr(errorMsg(fileName));
};

const oneFile = content => content.length <= 1;

const printHead = function (print, fileReader, ...args) {
  const headContent = headMain(fileReader, ...args);
  if (oneFile(headContent) && headContent[0].fileExist) {
    print.stdOut(headContent[0].content);
    return 0;
  }

  let separator = '';
  headContent.forEach(content => {
    printer(print, content, separator);
    separator = '\n';
  });

  return headContent.every(file => file.fileExist) ? 0 : 1;
};

exports.printHead = printHead;

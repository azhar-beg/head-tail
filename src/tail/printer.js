const { tailMain } = require('./tailLib.js');

const errorMsg = file => `head: ${file}: No such file or directory`;

const formatter = (content, fileName) => {
  return `==> ${fileName} <==\n${content}`;
};

const printer = function (print, fileStatus) {
  const { content, fileExist, fileName } = fileStatus;
  if (fileExist) {
    print.stdOut(formatter(content, fileName));
    return;
  }
  print.stdErr(errorMsg(fileName));
};

const oneFile = content => content.length <= 1;

const printTail = function (print, fileReader, ...args) {
  const headContent = tailMain(fileReader, ...args);
  if (oneFile(headContent) && headContent[0].fileExist) {
    print.stdOut(headContent[0].content);
    return 0;
  }

  headContent.forEach(content => {
    printer(print, content);
  });

  return headContent.every(file => file.fileExist) ? 0 : 1;
};

exports.printTail = printTail;

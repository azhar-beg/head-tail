const { headFiles } = require('./headLib.js');

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

const isOneFile = content => content.length <= 1;

const headMain = function (print, fileReader, ...args) {
  const fileHeads = headFiles(fileReader, ...args);
  if (isOneFile(fileHeads) && fileHeads[0].fileExist) {
    print.stdOut(fileHeads[0].content);
    return 0;
  }

  let separator = '';
  fileHeads.forEach(content => {
    printer(print, content, separator);
    separator = '\n';
  });

  return fileHeads.every(file => file.fileExist) ? 0 : 1;
};

exports.headMain = headMain;

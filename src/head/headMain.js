const { headFiles, printHead } = require('./headLib.js');

const headMain = function (print, fileReader, ...args) {
  const fileHeads = headFiles(fileReader, ...args);
  printHead(fileHeads, print);
  return fileHeads.every(file => file.fileExist) ? 0 : 1;
};

exports.headMain = headMain;

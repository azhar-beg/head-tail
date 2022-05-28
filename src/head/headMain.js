const { headFiles, printHead } = require('./headLib.js');

const headMain = function (print, fileReader, ...args) {
  const fileHeads = headFiles(fileReader, ...args);
  printHead(fileHeads, print);
  return fileHeads.some(file => file.error) ? 1 : 0;
};

exports.headMain = headMain;

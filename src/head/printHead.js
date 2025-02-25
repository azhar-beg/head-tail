const header = fileName => `==> ${fileName} <==\n`;

const identity = arg => arg;

const addHeader = (content, fileName, separator) => {
  return separator + header(fileName) + content;
};

const isOneFile = content => content.length <= 1;

const printer = function (fileHead, print, formatter, separator) {
  const { content, fileName, error } = fileHead;
  if (content) {
    print.stdOut(formatter(content, fileName, separator));
    return;
  }
  print.stdErr(error);
};

const printHead = function (fileHeads, print) {
  const formatter = isOneFile(fileHeads) ? identity : addHeader;
  let separator = '';
  fileHeads.forEach(fileHead => {
    printer(fileHead, print, formatter, separator);
    separator = '\n';
  });
};

exports.printHead = printHead;

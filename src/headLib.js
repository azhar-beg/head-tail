const { splitContent, joinContent } = require('./stringUtils.js');
const { parseArgs } = require('./parseArgs.js');

const extractContent = (content, count) => content.slice(0, count);

const head = function (content, { option, count }) {
  const separator = option === 'character' ? '' : '\n';
  const splittedContent = splitContent(content, separator);
  const extractedContent = extractContent(splittedContent, count);
  return joinContent(extractedContent, separator);
};

const headMultipleFiles = function (filesContent, subArgs) {
  const headContent = filesContent.map(({ fileName, content, fileExist }) => {
    if (fileExist) {
      const extractedContent = head(content, subArgs);
      return { fileName, extractedContent, fileExist };
    }
    return { fileName, fileExist };
  });
  return headContent;
};

const headMain = function (readFile, ...args) {
  const { fileNames, subArgs } = parseArgs(args);
  const filesContent = [];
  for (let index = 0; index < fileNames.length; index++) {
    const fileName = fileNames[index];
    try {
      const content = readFile(fileNames[index], 'utf8');
      filesContent.push({ fileName, content, fileExist: true });
    } catch (error) {
      filesContent.push({ fileName, fileExist: false });
    }
  }
  return headMultipleFiles(filesContent, subArgs);
};

const printHead = function (readFile, ...args) {
  const content = headMain(readFile, ...args);
  if (content.length <= 1) {
    if (!content[0].fileExist) {
      console.error(`head: ${content[0].fileName}: No such file or directory`);
    } else {
      console.log(content[0].extractedContent);
    }
  } else {
    let separator = '';
    content.map(({ fileName, extractedContent, fileExist }) => {
      if (fileExist) {
        console.log(`${separator}==> ${fileName} <==\n${extractedContent}`);
      } else {
        const message = `head: ${fileName}: No such file or directory`;
        console.error(separator + message);
      }
      separator = '\n';
    });
  }
};

// const logContent
exports.extractContent = extractContent;
exports.head = head;
exports.headMain = headMain;
exports.headMultipleFiles = headMultipleFiles;
exports.printHead = printHead;
// exports.formatContent = formatContent;


const isError = args => args.includes('-n') && args.includes('-c');

const firstFileIndex = function (args) {
  for (let index = 0; index < args.length; index++) {
    if (!isFinite(args[index]) && !args[index].includes('-')) {
      return index;
    }
  }
};

const optionIndex = function (args) {
  let index = 0;
  for (let i = 0; i < args.length; i++) {
    if (args[i] === '-c' || args[i] === '-n') {
      index = i;
    }
  }
  return index;
};

const parseArgs = function (args) {
  if (isError(args)) {
    throw {
      name: 'head: can\'t combine line and byte counts'
    };
  }
  const startFileIndex = firstFileIndex(args);
  const fileNames = args.slice(startFileIndex);
  const optionIn = optionIndex(args);
  const option = args[optionIn] === '-c' ? 'character' : 'number';
  const countIn = optionIn + 1;
  const count = isFinite(+args[countIn]) ? +args[countIn] : 10;
  return { fileNames, subArgs: { option, count } };
};

exports.parseArgs = parseArgs;

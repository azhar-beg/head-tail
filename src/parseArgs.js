const { createIterator } = require('./createIterator.js');

const isOption = arg => (/^-[cn]\d*$|^-\d+/).test(arg);

const doesOptionContainsCount = option => (/^-[cn]\d+$|^-\d+/).test(option);

const getDigit = option => option.match(/(\d)+/)[0];

const getSwitch = arg => {
  const option = arg.slice(0, 2);
  return /c|n/.test(option) ? option : '-n';
};

const isSwitchSame = (option1, option2) => {
  return option1 ? option1.option === option2.option : true;
};

const appendCount = function (argsIterator, currentArg) {
  if (doesOptionContainsCount(currentArg)) {
    const option = getSwitch(currentArg);
    const count = +getDigit(currentArg);
    return { option, count };
  }
  const nextArg = argsIterator.nextArg();
  if (isFinite(nextArg)) {
    return { option: currentArg, count: +nextArg };
  }
  throw { message: 'head: illegal line count -- int' };
};

const getOption = function (argsIterator, option) {
  const currentArg = argsIterator.currentArg();
  if (!isOption(currentArg)) {
    return option;
  }
  const nextOption = appendCount(argsIterator, currentArg);
  argsIterator.nextArg();
  if (isSwitchSame(option, nextOption)) {
    return getOption(argsIterator, nextOption);
  }
  throw { message: 'head: can\'t combine line and byte counts' };
};

const parseArgs = function (args) {
  const argsIterator = createIterator(args);
  let subArgs;
  subArgs = getOption(argsIterator, subArgs);
  subArgs = subArgs ? subArgs : { option: '-n', count: 10 };
  const fileNames = argsIterator.restOfArgs();
  return { fileNames, subArgs };
};

exports.parseArgs = parseArgs;
exports.getOption = getOption;

const { createIterator } = require('./createIterator.js');

const isOption = arg => arg.startsWith('-');
const isNumericOption = arg => /^-\d+$/.test(arg);

const splitFlag = arg => arg.slice(0, 2);
const splitCount = arg => arg.slice(2);

const splitArg = arg => {
  if (isNumericOption(arg)) {
    return ['-n', arg.slice(1)];
  }
  return isOption(arg) ? [splitFlag(arg), splitCount(arg)] : arg;
};

const standardizeArgs = function (args) {
  return args.flatMap(splitArg).filter(arg => arg.length);
};

const areSwitchesSame = (option1, option2) => {
  return option1 ? option1.option === option2.option : true;
};

const noArg = () => {
  return {
    message: 'usage: head[-n lines | -c bytes][file ...]'
  };
};

const illegalCount = (name, count) => {
  return { message: `head: illegal ${name} count -- ${count}` };
};

const illegalOption = (option) => {
  const message = `head: illegal option -- ${option[1]}`;
  const usage = 'usage: head[-n lines | -c bytes][file ...]';
  return { message: message + '\n' + usage };
};

const noOptionArg = (option) => {
  const message = `head: option requires an argument -- ${option[1]}`;
  const usage = 'usage: head[-n lines | -c bytes][file ...]';
  return { message: message + '\n' + usage };
};

const illegalCombination = () => {
  return { message: 'head: can\'t combine line and byte counts' };
};

const assertOptionValidity = function (option) {
  if (['-c', '-n'].includes(option)) {
    return true;
  }
  throw illegalOption(option);
};

const assertCountValidity = function (count, option) {
  const name = { '-n': 'line', '-c': 'byte' };
  if (+count > 0) {
    return true;
  }
  if (count) {
    throw illegalCount(name[option], count);
  }
  throw noOptionArg(option);
};

const assertOnlyOne = function (option1, option2) {
  if (areSwitchesSame(option1, option2)) {
    return true;
  }
  throw illegalCombination();
};

const assertNoArg = (args) => {
  if (args.length) {
    return true;
  }
  throw noArg();
};

const getOption = function (argsIterator) {
  const option = argsIterator.currentArg();
  assertOptionValidity(option);
  return option;
};

const getValue = function (argsIterator, option) {
  const value = argsIterator.nextArg();
  assertCountValidity(value, option);
  return value;
};

const parseOption = function (argsIterator) {
  assertNoArg(argsIterator.restOfArgs());
  let options;
  while (isOption(argsIterator.currentArg()) && argsIterator.currentArg()) {
    const option = getOption(argsIterator);
    const optionVal = getValue(argsIterator, option);
    assertOnlyOne(options, { option, optionVal });
    options = { option, count: +optionVal };
    argsIterator.nextArg();
  }
  return options;
};

const parseArgs = function (commandLineArgs) {
  const args = standardizeArgs(commandLineArgs);
  const argsIterator = createIterator(args);
  let parsedOption = parseOption(argsIterator);
  parsedOption = parsedOption || { option: '-n', count: 10 };
  const fileNames = argsIterator.restOfArgs();
  return { fileNames, options: parsedOption };
};

exports.parseArgs = parseArgs;
exports.parseOption = parseOption;
exports.standardizeArgs = standardizeArgs;

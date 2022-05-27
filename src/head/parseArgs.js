const { createIterator } = require('./createIterator.js');
const { assertCountValidity,
  assertOnlyOne,
  assertOptionValidity,
  assertNoArg } = require('./validate.js');

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

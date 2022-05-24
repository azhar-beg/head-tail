const { splitArgs } = require('../lib/splitArgs.js');
const { createIterator } = require('./createIterator.js');
const { assertCountValidity,
  assertOnlyOne,
  assertOptionValidity,
  assertNoArg } = require('./validate.js');

const isOption = arg => arg.startsWith('-');

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

const getOptions = function (argsIterator) {
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
  const args = splitArgs(commandLineArgs);
  const argsIterator = createIterator(args);
  let options = getOptions(argsIterator);
  options = options || { option: '-n', count: 10 };
  const fileNames = argsIterator.restOfArgs();
  return { fileNames, options };
};

exports.parseArgs = parseArgs;
exports.getOptions = getOptions;

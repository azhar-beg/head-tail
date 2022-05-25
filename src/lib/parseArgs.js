/* eslint-disable complexity */
/* eslint-disable max-statements */
const { splitArgs } = require('../lib/splitArgs.js');
const { createIterator } = require('./createIterator.js');

const countParser = function (count) {
  this.validate(count);
  return { flag: this.flag, count };
};

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

const parseArgs = function (commandLineArgs, allOptions, defaultOption) {
  const args = splitArgs(commandLineArgs);
  assertNoArg(args);
  const iterableArgs = createIterator(args);
  let option = parseOption(iterableArgs, allOptions);
  option = option || defaultOption;
  const files = iterableArgs.restOfArgs();
  return { files, option };
};

exports.parseArgs = parseArgs;
exports.countParser = countParser;
// exports.parseOption = parseOption;

const { structureArgs } = require('../lib/structureArgs.js');
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
  let subArgs;
  while (isOption(argsIterator.currentArg()) && argsIterator.currentArg()) {
    const option = getOption(argsIterator);
    const optionVal = getValue(argsIterator, option);
    assertOnlyOne(subArgs, { option, optionVal });
    subArgs = { option, count: +optionVal };
    argsIterator.nextArg();
  }
  return subArgs;
};

const parseArgs = function (args) {
  const structuredArgs = structureArgs(args);
  const argsIterator = createIterator(structuredArgs);
  let subArgs = getOptions(argsIterator);
  subArgs = subArgs || { option: '-n', count: 10 };
  const fileNames = argsIterator.restOfArgs();
  return { fileNames, subArgs };
};

exports.parseArgs = parseArgs;
exports.getOptions = getOptions;

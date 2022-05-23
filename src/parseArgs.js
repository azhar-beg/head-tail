const { structureArgs } = require('./structureArgs.js')
const { createIterator } = require('./createIterator.js');
const { assertCountValidity,
  assertOnlyOne,
  assertOptionValidity } = require('./validate.js');

const isOption = arg => arg.startsWith('-');

const getOption = function (argsIterator) {
  let subArgs;
  while (isOption(argsIterator.currentArg()) && argsIterator.currentArg()) {
    const option = argsIterator.currentArg();
    assertOptionValidity(option);
    const optionVal = argsIterator.nextArg();
    assertCountValidity(optionVal, option);
    assertOnlyOne(subArgs, { option, optionVal });
    subArgs = { option, count: +optionVal };
    argsIterator.nextArg();
  }
  return subArgs;
};

const parseArgs = function (args) {
  const structuredArgs = structureArgs(args);
  const argsIterator = createIterator(structuredArgs);
  let subArgs = getOption(argsIterator);
  subArgs = subArgs || { option: '-n', count: 10 };
  const fileNames = argsIterator.restOfArgs();
  return { fileNames, subArgs };
};

exports.parseArgs = parseArgs;
exports.getOption = getOption;

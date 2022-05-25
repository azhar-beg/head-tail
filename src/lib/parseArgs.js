/* eslint-disable complexity */
/* eslint-disable max-statements */
const { splitArgs } = require('../lib/splitArgs.js');
const { createIterator } = require('./createIterator.js');

const countParser = function (count) {
  this.validate(count);
  return { flag: this.flag, count: +count };
};


const { assertCountValidity,
  assertOnlyOne,
  assertOptionValidity,
  assertNoArg } = require('./validate.js');

const last = function (option1, option2) {
  assertOnlyOne(option1, option2);
};

const isOption = arg => arg.startsWith('-');

const parseOption = function (argsIterator, parsingDetails) {
  assertNoArg(argsIterator.restOfArgs());
  const allOptions = [];
  while (isOption(argsIterator.currentArg()) && argsIterator.currentArg()) {
    const flag = argsIterator.currentArg();
    const detail = parsingDetails.find(detail => detail.flag === flag);
    assertOptionValidity(flag);
    const option = detail.parser(argsIterator.nextArg());
    allOptions.push(option);
    argsIterator.nextArg();
  }
  const option = allOptions.reduce(last);
  return option;
};

const parseArgs = function (commandLineArgs, parsingDetails, defaultOption) {
  const args = splitArgs(commandLineArgs);
  assertNoArg(args);
  const iterableArgs = createIterator(args);
  let option = parseOption(iterableArgs, parsingDetails);
  option = option || defaultOption;
  const files = iterableArgs.restOfArgs();
  return { files, option };
};

exports.parseArgs = parseArgs;
exports.countParser = countParser;
// exports.parseOption = parseOption;

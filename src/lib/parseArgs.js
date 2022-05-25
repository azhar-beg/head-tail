/* eslint-disable complexity */
/* eslint-disable max-statements */
const { splitArgs } = require('../lib/splitArgs.js');
const { createIterator } = require('./createIterator.js');

const countParser = function (count) {
  this.validate(count);
  return { flag: this.flag, count: +count };
};

const {
  illegalCombination,
  assertOptionValidity,
  assertNoArg } = require('./validate.js');

const last = function (option1, option2) {
  assertOnlyOne(option1, option2);
  return option2;
};

const isOption = arg => arg.startsWith('-');

const parseOption = function (iterableArgs, parsingDetails) {
  const allOptions = [];
  while (iterableArgs.currentArg() && isOption(iterableArgs.currentArg())) {
    const flag = iterableArgs.currentArg();
    const detail = parsingDetails.find(detail => detail.flag === flag);
    assertOptionValidity(flag);
    const option = detail.parser(iterableArgs.nextArg());
    allOptions.push(option);
    iterableArgs.nextArg();
  }
  if (allOptions.length < 2) {
    return allOptions[0];
  }
  throw illegalCombination;
  // const option = allOptions.reduce(last);
  // return option;
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

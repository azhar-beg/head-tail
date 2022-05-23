const { structureArgs } = require('./structureArgs.js')
const { createIterator } = require('./createIterator.js');

const isOption = arg => arg.startsWith('-');

const areSwitchesSame = (option1, option2) => {
  return option1 ? option1.option === option2.option : true;
};

const assertOptionValidity = function (option) {
  if (['-c', '-n'].includes(option)) {
    return true;
  }
  const message = 'head: illegal option --w';
  const usage = 'usage: head[-n lines | -c bytes][file ...]';
  throw { message: message + '\n' + usage };
};

const assertCountValidity = function (count, option) {
  const name = { '-n': 'line', '-c': 'byte' };
  if (+count > 0) {
    return true;
  }
  if (count === 0 || count) {
    throw { message: `head: illegal ${name[option]} count -- ${count}` };
  }
  const message = `head: option requires an argument-- ${option}`;
  const usage = 'usage: head[-n lines | -c bytes][file ...]';
  throw { message: message + '\n' + usage };
};

const assertCombineValidity = function (option1, option2) {
  if (areSwitchesSame(option1, option2)) {
    return true;
  }
  throw {
    message: 'head: can\'t combine line and byte counts'
  };
};

const getOption = function (argsIterator) {
  let subArgs;
  while (isOption(argsIterator.currentArg()) && argsIterator.currentArg()) {
    const option = argsIterator.currentArg();
    assertOptionValidity(option);
    const count = +argsIterator.nextArg();
    assertCountValidity(argsIterator.currentArg(), option);
    assertCombineValidity(subArgs, { option, count });
    subArgs = { option, count };
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

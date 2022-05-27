const { assertCountValidity } = require('./validate.js');
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

const noArg = () => {
  return {
    message: 'usage: tail [-F | -f | -r] [-q] [-b # | -c # | -n #] [file ...]'
  };
};

const countParser = function (count) {
  this.validate(count);
  return { flag: this.flag, count: +count };
};

const parser = function () {
  const option = {};
  const flag = this.flag === '-r' ? 'reverse' : 'noHeader';
  option[flag] = true;
  return option;
};

const illegalOption = (option) => {
  const message = `tail: illegal option -- ${option[1]}`;
  const usage = 'usage: tail [-F | -f | -r] [-q] [-b # | -c # | -n #] [file ...]';
  return { message: message + '\n' + usage };
};

const assertOptionValidity = function (option) {
  if (['-r', '-q', '-c', '-n'].includes(option)) {
    return true;
  }
  throw illegalOption(option);
};

const assertNoArg = (args) => {
  if (args.length) {
    return true;
  }
  throw noArg();
};

const illegalCombination = () => {
  return {
    message:
      'usage: tail [-F | -f | -r] [-q] [-b # | -c # | -n #] [file ...]'
  };
};

const assertIllegalCombinations = function (flags, option) {
  if (flags.includes(option.flag)) {
    throw illegalCombination();
  }
  if (option.flag) {
    flags.push(option.flag);
  }
  if (flags.includes('-c') && flags.includes('-n')) {
    throw illegalCombination();
  }
  return flags;
};

const validCombination = function (options) {
  options?.reduce(assertIllegalCombinations, []);
  const flag = '-n';
  const reverse = false;
  const noHeader = false;
  const count = options?.some(option => option.reverse) ? Infinity : 10;
  let validOption = { count, flag, reverse, noHeader };

  validOption = options?.reduce((validOption, option) => {
    return { ...validOption, ...option };
  }, validOption);
  return validOption;
};

const parsingDetails = {
  options: [{
    flag: '-n',
    noValue: false,
    parser: countParser,
    validate: assertCountValidity
  },
  {
    flag: '-c',
    noValue: false,
    parser: countParser,
    validate: assertCountValidity
  },
  {
    flag: '-r',
    noValue: true,
    parser: parser
  },
  {
    flag: '-q',
    noValue: true,
    parser: parser
  }],
  getCombination: validCombination,
  assertOptionValidity: assertOptionValidity,
  assertNoArg: assertNoArg
};

const parseOption = function (iterableArgs, parsingDetails) {
  const allOptions = [];
  while (isOption(iterableArgs.currentArg()) && iterableArgs.currentArg()) {
    const flag = iterableArgs.currentArg();
    parsingDetails.assertOptionValidity(flag);
    const optionDetail = parsingDetails.options.find(option => option.flag === flag);
    if (!optionDetail.noValue) {
      iterableArgs.nextArg()
    }
    const option = optionDetail.parser(iterableArgs.currentArg());
    allOptions.push(option);
    iterableArgs.nextArg();
  };
  return parsingDetails.getCombination(allOptions);
};

const parseArgs = function (commandLineArgs, parsingDetails, defaultOption) {
  const args = standardizeArgs(commandLineArgs);
  parsingDetails.assertNoArg(args);
  const iterableArgs = createIterator(args);
  let option = parseOption(iterableArgs, parsingDetails);
  option = option || defaultOption;
  const files = iterableArgs.restOfArgs();
  return { files, option };
};

const parseTail = function (args) {
  return parseArgs(args, parsingDetails);
};

exports.parseArgs = parseArgs;
exports.parsingDetails = parsingDetails;
exports.parseTail = parseTail;

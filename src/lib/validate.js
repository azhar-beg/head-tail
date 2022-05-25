const areSwitchesSame = (option1, option2) => {
  return option1 ? option1.flag === option2.flag : true;
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

exports.assertCountValidity = assertCountValidity;
exports.assertOnlyOne = assertOnlyOne;
exports.assertOptionValidity = assertOptionValidity;
exports.assertNoArg = assertNoArg;

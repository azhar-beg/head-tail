const illegalCount = (count) => {
  return { message: `tail: illegal offset -- ${count}` };
};

const noOptionArg = (option) => {
  const message = `tail: option requires an argument -- ${option}`;
  const usage = 'usage: tail [-F | -f | -r] [-q] [-b # | -c # | -n #] [file ...]';
  return { message: message + '\n' + usage };
};

const assertCountValidity = function (count, option) {
  if (+count > 0) {
    return true;
  }
  if (count) {
    throw illegalCount(count);
  }
  throw noOptionArg(option);
};

exports.assertCountValidity = assertCountValidity;

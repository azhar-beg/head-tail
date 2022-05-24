const structureArgs = function (args) {
  return args.flatMap(arg => {
    if (/^-\d+$/.test(arg)) {
      return ['-n', arg.slice(1)];
    }
    return arg.startsWith('-') ? [arg.slice(0, 2), arg.slice(2)] : arg;
  }).filter(arg => arg.length);
};

exports.structureArgs = structureArgs;

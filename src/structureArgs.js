const structureArgs = function (args) {
  return args.flatMap(arg => {
    return arg.startsWith('-') ? [arg.slice(0, 2), arg.slice(2)] : arg;
  }).filter(arg => arg.length);
};

exports.structureArgs = structureArgs;

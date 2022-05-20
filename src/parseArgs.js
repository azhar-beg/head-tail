const parseArgs = (args) => {
  const fileName = args[args.length - 1];
  const option = args[0] === '-c' ? 'character' : 'number';
  const count = isFinite(args[1]) ? args[1] : 10;
  return { fileName, option, count };
};

exports.parseArgs = parseArgs;

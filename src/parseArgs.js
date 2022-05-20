const parseArgs = (args) => {
  const regEx = /-[cn]/;
  const firstFileIndex = regEx.test(args[0]) ? 2 : 0;
  const fileNames = args.slice(firstFileIndex);
  const option = args[0] === '-c' ? 'character' : 'number';
  const count = isFinite(args[1]) ? +args[1] : 10;
  return { fileNames, option, count };
};

exports.parseArgs = parseArgs;

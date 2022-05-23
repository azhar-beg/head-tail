const nextArg = function () {
  this.index++;
  return this.args[this.index];
};

const currentArg = function () {
  return this.args[this.index];
};

const restOfArgs = function () {
  return this.args.slice(this.index);
};

const createIterator = (args) => {
  const argsIterator = {};
  const iterator = { args, index: 0 };

  argsIterator.currentArg = currentArg.bind(iterator);
  argsIterator.nextArg = nextArg.bind(iterator);
  argsIterator.restOfArgs = restOfArgs.bind(iterator);
  return argsIterator;
};

exports.createIterator = createIterator;

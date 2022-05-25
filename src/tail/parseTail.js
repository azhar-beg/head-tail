const { parseArgs } = require('../lib/parseArgs.js');
const { assertCountValidity } = require('./validate.js');

const countParser = function (count) {
  this.validate(count);
  return { flag: this.flag, count: +count };
};

const allOptions = [
  {
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
];

const parseTail = function (args) {
  return parseArgs(args, allOptions, { flag: '-n', count: 10 });
};

exports.parseTail = parseTail;

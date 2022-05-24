// console.log('usage: tail [-c # | -n #] [file ...]');
const fs = require('fs');
const { tailMain } = require('./src/tail/tailLib.js');

const main = () => {
  console.log(tailMain(fs.readFileSync, process.argv[2])[0].content);
};

main();

// console.log('usage: tail [-c # | -n #] [file ...]');
const fs = require('fs');
const { tailMain } = require('./src/tail/tailLib.js');

const main = () => {
  try {
    console.log(tailMain(fs.readFileSync, ...process.argv.slice(2))[0].content);
  } catch (error) {
    console.error(error.message);
    process.exit(1);
  }
};

main();

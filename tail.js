const fs = require('fs');
const { printTail } = require('./src/tail/printer.js');

const main = () => {
  try {
    const print = { stdOut: console.log, stdErr: console.error };
    const code = printTail(print, fs.readFileSync, ...process.argv.slice(2));
    process.exit(code);
  } catch (error) {
    console.error(error.message);
    process.exit(1);
  }
};

main();

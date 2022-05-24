const { printHead } = require('./src/head/printer.js');
const fs = require('fs');
const console = require('console');

const main = () => {
  const print = { stdOut: console.log, stdErr: console.error };
  try {
    const exitCode = printHead(print,
      fs.readFileSync, ...process.argv.slice(2));
    process.exit(exitCode);
  } catch (error) {
    console.error(error.message);
    process.exit(1);
  }
};

main();

const { printHead } = require('./src/head/printer.js');
const fs = require('fs');

const main = () => {
  try {
    const exitCode = printHead(console.log, console.error,
      fs.readFileSync, ...process.argv.slice(2));
    process.exit(exitCode);
  } catch (error) {
    console.error(error.message);
    process.exit(1);
  }
};

main();

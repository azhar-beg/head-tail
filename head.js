const { printHead } = require('./src/headLib.js');
const fs = require('fs');

const main = () => {
  try {
    printHead(fs.readFileSync, ...process.argv.slice(2));
  } catch (error) {
    console.error(error.message);
  }
};

main();

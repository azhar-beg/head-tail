const { headMain } = require('./src/head/headMain.js');
const fs = require('fs');

const main = () => {
  const print = { stdOut: console.log, stdErr: console.error };
  try {
    process.exitCode = headMain(print,
      fs.readFileSync, ...process.argv.slice(2));
  } catch (error) {
    console.error(error.message);
    process.exitCode = 1;
  }
};

main();

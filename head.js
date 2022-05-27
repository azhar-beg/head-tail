const { headMain } = require('./src/head/headMain.js');
const fs = require('fs');

const main = (args) => {
  const print = { stdOut: console.log, stdErr: console.error };
  try {
    process.exitCode = headMain(print,
      fs.readFileSync,
      ...args);
  } catch (error) {
    console.error(error.message);
    process.exitCode = 1;
  }
};

main(process.argv.slice(2));

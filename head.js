const { headMain } = require('./src/headLib.js');
const fs = require('fs');

const main = () => {
  try {
    console.log(headMain(fs.readFileSync, process.argv[2]));
  } catch (error) {
    console.log('usage: head [-n lines | -c bytes] [file ...]');
  }
};

main();

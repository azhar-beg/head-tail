# TAIL

- **TODO**
  - [ ] Make generic parse args
  - [ ] Make tail work from command line with valid options.

- **MAYBE**

- **DONE**
  - [x] Restructure test actual and expected.
  - [x] Make tailParser for `-r` and `-q`
  - [x] Make printer for tail
  - [x] Make tail work for '-n'
  - [x] Make parse work with -n and -c
  - [x] Make tail work for single file without any option.
  - [x] Made tail work only for one file content.
  - [x] Made tail work for multiple file content;

---

# HEAD

- **TODO:**
  - [ ] validate args returned from structureArgs

- **MAYBE:**
  - [ ] Consider separating test from `testHeadLib`

- **DONE:**
  - [x] Decide error while reading file.
  - [x] Change name of headMain to headFiles and change test file name
  - [x] Extract printing functionality from headMain
  - [x] Consider better name for `headMultipleFile`.
  - [x] Refactor printer, think better name for printHead.
  - [x] refactor head and printer
  - [x] Changed names of object keys and variables.
  - [x] Create separate directory structure for head and tail in src and test
  - [x] Document tail contract.
  - [x] Refactor printHead function
  - [x] separate validate function
  - [x] extract error throw in separate function;
  - [x] Change approach for parseArgs
  - [x] Validate `parseArgs`
  - [x] add structureArgs
  - [x] Test getOption
  - [x] Refactor headMultipleFiles
  - [x] Make parse work for `-number`
  - [x] Test CreateIterator
  - [x] work on parse error.
  - [x] Refactor `parseArgs`
  - [x] Create separate file for iterator.
  - [x] Show error message on std error.
  - [x] Validate headMain for wrong fileName.
  - [x] Check if head.js working with options for multiple files.
  - [x] Make head work on multiple files without any option.
  - [x] Make head work with content of multiple files.
  - [x] Add mockReadFile that will take multiple file in object.
  - [x] Extract formatting work from headMultipleFile
  - [x] Update parseArgs, it should return error for wrong args
  - [x] Make parse returns multiple files name
  - [x] change names of stringUtils functions.
  - [x] Change functions and variable names.
  - [x] Consider better contract for head.
  - [x] Implement `-n` option for one file.
  - [x] pass `-n` and `-c` option to headMain.
  - [x] Use parseArgs in headMain.
  - [x] Implemented parsedArgs.
  - [x] Implement head for character [-c].
  - [x] Consider changing the name of headLines function.
  - [x] Add lineCount argument for head.
  - [x] Consider renaming src/head.js.
  - [x] Make `head file` working for single file.
  - [x] Split tests of headMain into separate file.
  - [x] Change name of line.js.
  - [x] Create headMain
  - [x] Consider moving splitLines and joinLines in different file.
  - [x] Extract split and join lines in different function.
  - [x] Implement head that will work for file content.
  - [x] Implement default head for separate lines.
  - [x] `headlines` should work for more than 10 lines.
  - [x] Make corrections in contract
  - [x] Move headLines from testHead.js to head.js.
  - [x] Create testHead.js
  - [x] Verify Mocha 
  - [x] Create directory structure, separate src and test directory
  - [x] Document contract

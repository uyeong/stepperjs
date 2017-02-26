// require all test file(s).
const testsContext = require.context(".", true, /(-test\.js)$/);
testsContext.keys().forEach(testsContext);

// require all source file(s).
const sourceContext = require.context("../src", true, /(\.js)$/);
sourceContext.keys().forEach(sourceContext);

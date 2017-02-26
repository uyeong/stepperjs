// Karma configuration
// Generated on Tue Nov 08 2016 18:07:40 GMT+0900 (KST)

const path = require('path');
const webpack = require('./webpack.config.js');

webpack.devtool = 'inline-source-map';

module.exports = function(config) {
  let coverageIstanbulReporter = {};
  const reporters = ['spec'];

  if (config.coverage) {
    webpack.module.rules.push({
        test: /\.js$/,
        enforce: 'post',
        include: path.resolve('src/'),
        loader: 'istanbul-instrumenter-loader'
    });

    coverageIstanbulReporter = {
      dir: '.reports',
      reports: ['html', 'lcov', 'cobertura'],
        fixWebpackSourcePaths: true,
        'report-config': {
          html: {subdir: 'html-report'},
          cobertura: {file: 'cobertura.xml'}
        }
    };

    reporters.push('coverage-istanbul');
  }

  config.set({

    // base path that will be used to resolve all patterns (eg. files, exclude)
    basePath: '',


    // frameworks to use
    // available frameworks: https://npmjs.org/browse/keyword/karma-adapter
    frameworks: ['mocha', 'chai', 'sinon'],


    // list of files / patterns to load in the browser
    files: [
      'tests/test-entry.js',
      './node_modules/phantomjs-polyfill-find-index/findIndex-polyfill.js'
    ],


    // list of files to exclude
    exclude: [],


    // preprocess matching files before serving them to the browser
    // available preprocessors: https://npmjs.org/browse/keyword/karma-preprocessor
    preprocessors: {
      './tests/test-entry.js': ['webpack', 'sourcemap']
    },


    // test results reporter to use
    // possible values: 'dots', 'progress'
    // available reporters: https://npmjs.org/browse/keyword/karma-reporter
    reporters,


    coverageIstanbulReporter,


    webpack,


    // web server port
    port: 9876,


    // enable / disable colors in the output (reporters and logs)
    colors: true,


    // level of logging
    // possible values: config.LOG_DISABLE || config.LOG_ERROR || config.LOG_WARN || config.LOG_INFO || config.LOG_DEBUG
    logLevel: config.LOG_INFO,


    // enable / disable watching file and executing tests whenever any file changes
    autoWatch: false,


    // start these browsers
    // available browser launchers: https://npmjs.org/browse/keyword/karma-launcher
    browsers: ['Chrome', 'Firefox', 'PhantomJS'],


    // Continuous Integration mode
    // if true, Karma captures browsers, runs the tests and exits
    singleRun: false,


    // Concurrency level
    // how many browser should be started simultaneous
    concurrency: Infinity
  })
};

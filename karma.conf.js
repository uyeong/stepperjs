// Karma configuration
// Generated on Tue Nov 08 2016 18:07:40 GMT+0900 (KST)

const webpack = require('./webpack.config.js');

webpack.entry = null;
webpack.output = null;

module.exports = function(config) {
  let coverageReporter = {};
  const reporters = ['spec'];

  if (config.coverage) {
    coverageReporter = {
      dir: '.reports',
      reporters: [
        {type: 'html', subdir: 'report-html'},
        {type: 'lcov', subdir: 'report-lcov'},
        {type: 'cobertura', subdir: '.', file: 'cobertura.xml'}
      ]
    };

    webpack.isparta = {
      embedSource: true,
      noAutoWrap: true,
      babel: {
        presets: ['es2015']
      }
    };

    webpack.module.preLoaders = [
      {
        test: /(\.js)$/,
        exclude: /(tests|node_modules)/,
        loader: 'isparta'
      }
    ];

    reporters.push('coverage');
  }

  config.set({

    // base path that will be used to resolve all patterns (eg. files, exclude)
    basePath: '',


    // frameworks to use
    // available frameworks: https://npmjs.org/browse/keyword/karma-adapter
    frameworks: ['mocha', 'chai', 'sinon'],


    // list of files / patterns to load in the browser
    files: [
      'tests/**/*-test.js',
      './node_modules/phantomjs-polyfill-find-index/findIndex-polyfill.js'
    ],


    // list of files to exclude
    exclude: [],


    // preprocess matching files before serving them to the browser
    // available preprocessors: https://npmjs.org/browse/keyword/karma-preprocessor
    preprocessors: {
      './tests/**/*-test.js': ['webpack']
    },


    // test results reporter to use
    // possible values: 'dots', 'progress'
    // available reporters: https://npmjs.org/browse/keyword/karma-reporter
    reporters,


    coverageReporter,


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

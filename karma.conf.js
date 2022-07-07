// Karma configuration
// Generated on Fri Apr 08 2022 13:49:09 GMT+0900 (대한민국 표준시)

//api test
const apiClientTest = "test/api/*.js";
const authTest = "test/api/auth/*.js";
const callTest = "test/api/call/*.js";
const presenceTest = "test/api/presence/*.js";
const sseTest = "test/api/sse/*.js";
//ui test
const uiTest = "test/ui/*.js";
//module test
const moduleTest = "test/api/sse/*.js";

module.exports = function (config) {
  config.set({
    // base path that will be used to resolve all patterns (eg. files, exclude)
    basePath: "",

    // frameworks to use
    // available frameworks: https://www.npmjs.com/search?q=keywords:karma-adapter
    frameworks: ["mocha", "chai"],

    // list of files / patterns to load in the browser
    files: [
      "src/**/*.js",
      apiClientTest,
      // authTest,
      // callTest,
      // presenceTest,
      // sseTest,
      uiTest,
      // moduleTest,
    ],

    // list of files / patterns to exclude
    exclude: [],

    // preprocess matching files before serving them to the browser
    // available preprocessors: https://www.npmjs.com/search?q=keywords:karma-preprocessor
    preprocessors: {
      "src/**/*.js": ["webpack"],
      "test/**/*.js": ["webpack"],
    },
    webpack: require("./webpack.config.js"),
    webpackMiddleware: {
      stats: "errors-only",
    },
    // test results reporter to use
    // possible values: 'dots', 'progress'
    // available reporters: https://www.npmjs.com/search?q=keywords:karma-reporter
    reporters: ["progress"],
    coverageReporter: {
      type: "html",
    },

    // web server port
    port: 9876,

    // enable / disable colors in the output (reporters and logs)
    colors: true,

    // level of logging
    // possible values: config.LOG_DISABLE || config.LOG_ERROR || config.LOG_WARN || config.LOG_INFO || config.LOG_DEBUG
    logLevel: config.LOG_INFO,

    // enable / disable watching file and executing tests whenever any file changes
    autoWatch: true,

    // start these browsers
    // available browser launchers: https://www.npmjs.com/search?q=keywords:karma-launcher
    browsers: [
      "Chrome",
      // , "Safari", "Firefox", "ChromeHeadless", "ChromeCanary", "PhantomJS"
    ],

    // Continuous Integration mode
    // if true, Karma captures browsers, runs the tests and exits
    singleRun: true,

    // Concurrency level
    // how many browser instances should be started simultaneously
    concurrency: Infinity,
  });
};

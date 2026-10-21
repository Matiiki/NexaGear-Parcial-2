module.exports = function(config) {

    config.set({

        basePath: "",

        frameworks: [
            "jasmine"
        ],

        files: [

            {
                pattern: "src/utils/**/*.js",
                included: false,
                served: true,
                type: "module"
            },

            {
                pattern: "src/tests/*.spec.js",
                included: true,
                served: true,
                type: "module"
            }

        ],

        preprocessors: {

            "src/utils/**/*.js": [
                "coverage"
            ]

        },

        reporters: [
            "progress",
            "coverage"
        ],

        coverageReporter: {

            dir: "coverage",

            reporters: [

                {
                    type: "html",
                    subdir: "html"
                },

                {
                    type: "text-summary"
                }

            ]

        },

        port: 9876,

        colors: true,

        logLevel: config.LOG_INFO,

        autoWatch: false,

        browsers: [
            "ChromeHeadless"
        ],

        singleRun: true,

        concurrency: Infinity
    });
};
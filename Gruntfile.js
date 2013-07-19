process.env.PHANTOMJS_BIN = __dirname + '/node_modules/phantomjs/lib/phantom/bin/phantomjs';

module.exports = function(grunt) {

    // Project configuration.
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        karma: {
            options: {
                // setting urlRoot to __dirname serves e2e browser().navigateTo calls
                urlRoot: __dirname + '/',
                basePath: __dirname,
                logLevel: 'info',
                exclude: [
                    '**/*.min.js'
                ],
                browsers: ['PhantomJS']
            },
            "e2e-dev": {
                options: {
                    configFile: "specs/e2e.karma.conf.js",
                    singleRun: false,
                    autoWatch: true
                }
            },
            "unit-dev": {
                options: {
                    configFile: "specs/unit.karma.conf.js",
                    singleRun: false,
                    autoWatch: true
                }
            },
            "e2e-qa": {
                options: {
                    configFile: "specs/e2e.karma.conf.js",
                    singleRun: true,
                    autoWatch: false
                }
            },
            "unit-qa": {
                options: {
                    configFile: "specs/unit.karma.conf.js",
                    singleRun: true,
                    autoWatch: false
                }
            }
        }
    });
    
    grunt.registerTask('test:qa', ['karma:unit-qa','karma:e2e-qa']);

    // Load the plugins provided by npm
    grunt.loadNpmTasks('grunt-karma');
};

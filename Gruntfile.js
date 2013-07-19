process.env.PHANTOMJS_BIN = __dirname + '/node_modules/phantomjs/lib/phantom/bin/phantomjs';

module.exports = function(grunt) {

    // Project configuration.
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        karma: {
            options: {
                // does not serve any purpose but to fix a grunt-karma error
                configFile: 'node_modules/grunt-karma/karma.conf.js',
                // setting urlRoot to __dirname serves e2e browser().navigateTo calls
                urlRoot: __dirname + '/',
                basePath: __dirname,
                singleRun: true,
                autoWatch: false,
                logLevel: 'info',
                exclude: [
                    '**/*.min.js'
                ]
            },
            "e2e-dev": {
                options: {
                    files: [
                        'node_modules/karma/adapter/lib/angular-scenario.js',
                        'node_modules/karma/adapter/angular-scenario.js',
                        //watch for reload but do not include into html
                        {pattern: '**/*.html', included: false},
                        {pattern: '**/*.css', included: false},
                        'lib/angular/angular.js',
                        'lib/**/*.js',
                        'src/**/*.js',
                        'specs/e2e/**/*.js'
                    ],
                    browsers: ['PhantomJS'],
                    singleRun: false,
                    autoWatch: true
                }
            },
            "unit-dev": {
                options: {
                    files: [
                        'node_modules/karma/adapter/lib/jasmine.js',
                        'node_modules/karma/adapter/jasmine.js',
                        //watch for reload but do not include into html
                        {pattern: '**/*.html', included: false},
                        'lib/angular/angular.js',
                        'lib/**/*.js',
                        'src/**/*.js',
                        'specs/unit/**/*.js'
                    ],
                    browsers: ['PhantomJS'],
                    singleRun: false,
                    autoWatch: true
                }
            }
        }
    });


    // Default task(s).
    grunt.registerTask('test:unit-dev', ['karma:unit-dev']);
    grunt.registerTask('test:e2e-dev',  ['karma:e2e-dev']);

    // Load the plugins provided by npm
    grunt.loadNpmTasks('grunt-karma');
};

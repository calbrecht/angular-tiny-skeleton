// basePath defined in Gruntfile.js
module.exports = function(config) {
    config.set({
        frameworks: ['ng-scenario'],
        preprocessors: {
            '**/*.html': []
        },
        files: [
            //watch for reload but do not include into html
            {pattern: '**/*.html', included: false},
            {pattern: '**/*.css', included: false},
            'lib/angular/angular.js',
            'lib/**/*.js',
            'src/**/*.js',
            'specs/e2e/**/*.js'
        ]
    });
};
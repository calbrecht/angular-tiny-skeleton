//basePath defined in Gruntfile.js

module.exports = function(config) {
    config.set({
        frameworks: ['jasmine'],
        files: [
            //watch for reload but do not include into html
            {pattern: '**/*.html', included: false},
            'bower_components/angular/angular.js',
            'bower_components/**/*.js',
            'src/**/*.js',
            'specs/unit/**/*.js'
        ]
    });
};

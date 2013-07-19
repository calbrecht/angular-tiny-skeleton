//basePath defined in Gruntfile.js

files = [
    'node_modules/karma/adapter/lib/jasmine.js',
    'node_modules/karma/adapter/jasmine.js',
    //watch for reload but do not include into html
    {pattern: '**/*.html', included: false},
    'lib/angular/angular.js',
    'lib/**/*.js',
    'src/**/*.js',
    'specs/unit/**/*.js'
];


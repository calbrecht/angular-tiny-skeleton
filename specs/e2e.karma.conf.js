// basePath defined in Gruntfile.js
files = [
    'node_modules/karma/adapter/lib/angular-scenario.js',
    'node_modules/karma/adapter/angular-scenario.js',
    //watch for reload but do not include into html
    {pattern: '**/*.html', included: false},
    {pattern: '**/*.css', included: false},
    'lib/angular/angular.js',
    'lib/**/*.js',
    'src/**/*.js',
    'specs/e2e/**/*.js'
];


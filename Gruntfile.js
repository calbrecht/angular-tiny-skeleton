// set PHANTOMJS_BIN for karma
process.env.PHANTOMJS_BIN =  require('phantomjs').path;

module.exports = function(grunt) {

    // Project configuration.
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        karma: {
            options: {
                // setting urlRoot to /base/ serves e2e browser().navigateTo calls relative to basePath
                urlRoot: '/base/',
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

    grunt.registerTask('latest', ['npm:load', 'npm:outdated', 'npm:update', 'latest:bower', 'latest:finally']);

    grunt.registerTask('npm:load', function () {
        var npm = require(require('path').resolve(process.execPath, '../../lib/node_modules/npm/lib/npm.js')),
            done = this.async();

        npm.load({_exit: false}, function () {
            grunt.util.npm = npm;
            done();
        });
    });

    grunt.registerTask('npm:outdated', function() {
        this.requires('npm:load');

        var npm = grunt.util.npm,
            done = this.async();

        npm.config.set('depth', 0);
        npm.commands.outdated([], true, function (er, outdated) {
            grunt.option('npm.newer', outdated.map(function(pkg){ return pkg[1] + '@' + pkg[4] }));
            done();
        });
    });

    grunt.registerTask('npm:update', function() {
        this.requires('npm:outdated');

        var npm = grunt.util.npm,
            newer = grunt.option('npm.newer'),
            done = this.async();

        if (newer.length) {
            npm.config.set('depth', null);
            npm.config.set('save-dev', true);
            npm.commands.install(newer, function() {
                grunt.option('npm.updated', newer);
                done();
            });
        } else {
            done();
        }
    });

    grunt.registerTask('latest:bower', 'Updates bower components to latest.', function() {
        var bower = require('bower'),
            bowerProject = new (require('./node_modules/bower/lib/core/Project.js')),
            done = this.async();

        this.requires('npm:update');

        bowerProject.getJson().then(function(config) {
            bower.commands.info('angular#*', 'version')
                .on('end', function(latest) {
                    if (latest !== config.version) {
                        bowerProject.uninstall(['angular', 'angular-mocks']).then(function() {
                            config.version = latest;
                            config.dependencies['angular'] = latest;
                            config.devDependencies['angular-mocks'] = latest;
                            bowerProject.saveJson().then(function(){
                                bowerProject.install().then(function() {
                                    grunt.option('bower.updated', ['angular#' + latest]);
                                    done();
                                });
                            });
                        });
                    } else {
                        done();
                    }
                });
        });
    });

    grunt.registerTask('latest:finally', 'Write CHANGELOG, increase build number.', function() {
        this.requires('latest:bower');

        var fs = require('fs'),
            updated = (grunt.option('npm.updated') || []).concat(grunt.option('bower.updated') || []),
            done = this.async();

        if (updated.length) {
            var package = JSON.parse(fs.readFileSync('package.json')),
                v = package.version.match(/([\.0-9]+)-?([0-9]*)/);

            package.version = [v[1], ++v[2]].join('-');
            var changelog = [package.version + ' ' + Date() + '\n  Auto updated packages:']
                .concat(updated)
                .join('\n  - ')
                .concat('\n' + fs.readFileSync('CHANGELOG'));
            fs.writeFileSync('package.json', JSON.stringify(package, null, 2));
            fs.writeFileSync('CHANGELOG', changelog);
        }

    });
};

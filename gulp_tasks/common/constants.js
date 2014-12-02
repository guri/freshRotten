'use strict';

var path = require('path');

module.exports = function() {
    var cwd = process.env.INIT_CWD || '';
    var clientFolder = 'client';
    var constants = {
        clientFolder: clientFolder,
        repository: 'https://github.com/guri/rottenfresh',
        versionFiles: ['./package.json', './bower.json'],
        growly: {
            notify: false,
            successIcon: path.join(cwd, 'node_modules/karma-growl-reporter/images/success.png'),
            failedIcon: path.join(cwd, 'node_modules/karma-growl-reporter/images/failed.png')
        },

        lint: ['./' + clientFolder + '/**/*.js', './server/**/*.js', 'gulpfile.js', 'gulp_tasks/**/*.js', 'karam.conf.js', 'test/**/*.js', '!./' + clientFolder + '/scripts/bundle.js', '!./' + clientFolder + '/scripts/bundle.min.js'],

        fonts: {
            src: ['./bower_components/ionic/release/fonts/*.*'],
            dest: './' + clientFolder + '/fonts'
        },

        style: {
            src: ['./' + clientFolder + '/styles/**/*.css', './' + clientFolder + '/styles/**/*.scss', '!./' + clientFolder + '/styles/main.css', '!./' + clientFolder + '/styles/main.min.css'],
            dest: './' + clientFolder + '/styles',
            destName: 'main.css',
            sass: {
                src: ['./' + clientFolder + '/styles/main.scss']
            },
            css: {
                src: ['./bower_components/famous-angular/dist/famous-angular.css']
            }
        },

        browserify: {
            src: './' + clientFolder + '/scripts/main.js',
            dest: './' + clientFolder + '/scripts',
            bundleName: 'bundle.js'
        },

        serve: {
            root: clientFolder,
            host: '127.0.0.1',
            livereload: 9000,
            port: 5000,
            localtunnel: false // true, false or 'try-yo-ionic-famous'
        },
        mocha: {
            libs: ['server/**/*.js'],
            tests: ['test/mocha/**/*.js'],
            globals: 'test/mocha/helpers/globals.js',
            timeout: 5000
        }

    };

    return constants;
};
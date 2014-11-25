'use strict';
require('angular-ui-router');
require('angular-ionic');
require('famous-angular');

var modulename = 'freshrotten';

module.exports = function(namespace) {

    var fullname = namespace + '.' + modulename;

    var angular = require('angular');
    var app = angular.module(fullname, ['ui.router', 'ionic', 'famous.angular']);
    // inject:folders start
    require('./controllers')(app);
    require('./media')(app);
    require('./services')(app);

    // inject:folders end
    app.config(['$stateProvider', '$urlRouterProvider',
        function($stateProvider, $urlRouterProvider) {
            $urlRouterProvider.otherwise('/');
            $stateProvider.state('home', {
                url: '/',
                template: require('./views/home.html')
            });
        }
    ]);
    return app;
};
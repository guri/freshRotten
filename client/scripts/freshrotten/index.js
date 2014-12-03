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
    //require('./media')(app);
    require('./services')(app);

    // inject:folders end
    app.config(['$stateProvider', '$urlRouterProvider',
        function($stateProvider, $urlRouterProvider) {
            $urlRouterProvider.otherwise('/');

            $stateProvider.state('main', {
                url: '/',
                //abstract: true,
                template: require('./views/pages_container.html'),
                controller: 'main.freshrotten.appCtrl as appCtrl'
 
                // views: { 
                //     'main': {
                //         template: require('./views/pages_container.html'),
                //         controller: 'main.freshrotten.appCtrl as appCtrl'
                //     }
                // }
            });

            $stateProvider.state('main.search', {
                url: '/search',
                views: {
                    'search': {
                        template: require('./views/home.html'),
                        controller: 'main.freshrotten.searchRottenCtrl as searchCtrl'
                    }
                }
            });

            $stateProvider.state('main.movie', {
                url: '/movie/:movie_id',
               // onEnter: function(movie.id) {
                //     movie = searchRotten.getMovieInfo(movie.id);
                //     movie = searchRotten.getMovieReviews(movie.id);
                // }
                views: {
                    'movie': {
                        template: require('./views/moviepage.html'),
                        controller: 'main.freshrotten.movieCtrl as movieCtrl'
                    }
                },

            });            
        }
    ]);

    return app;
};


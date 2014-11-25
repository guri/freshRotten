'use strict';
var servicename = 'searchRotten';

module.exports = function(app) {

    var dependencies = [];
    //var dependencies = ["$http"];

    function service() {
        var isInitialized = false;
        var init = function() {
            isInitialized = true;
        };

        var apikey = "7ue5rxaj9xn4mhbmsuexug54";

        return {
            // initialization
            init: init,

            $get: ['$q',
                function($q) {
                    var add = function(a, b) {
                        return a + b;
                    };

                    var searchMovies = function(query){
                        var rottenApiUrl="http://api.rottentomatoes.com/api/public/v1.0/movies.json?";
                        console.log($http);
                        // The rotten REST api sample :
                        //http://api.rottentomatoes.com/api/public/v1.0/movies.json?q=Toy&apikey=7ue5rxaj9xn4mhbmsuexug54
                    
                    };

                    return {
                        isInitialized: isInitialized,
                        add: add,
                        searchMovies: searchMovies
                    };
                }
            ]
        };

    }
    service.$inject = dependencies;

    app.provider(app.name + '.' + servicename, service);
};
'use strict';
var servicename = 'searchRotten';

module.exports = function(app) {

    //var dependencies = [];
    var dependencies = ['$httpProvider'];

    function service($httpProvider) {
        var isInitialized = false;
        var init = function() {
            isInitialized = true;
        };

        var apikey = "7ue5rxaj9xn4mhbmsuexug54";    
        $httpProvider.defaults.headers.common.apikey = apikey; //set general apikey for all future requests to rotten.
        $httpProvider.defaults.headers.common.callback = 'JSON_CALLBACK'; //set general apikey for all future requests to rotten.

        return {
            // initialization
            init: init,

            $get: ['$q', '$http',
                function($q, $http) {
                    var add = function(a, b) {
                        return a + b;
                    };

                    var searchMovies = function(query){

                        //var rottenApiUrl="http://api.rottentomatoes.com/api/public/v1.0/movies.json?";
                        var rottenApiUrl = 'http://api.rottentomatoes.com/api/public/v1.0/movies.json?q=Toy&apikey=7ue5rxaj9xn4mhbmsuexug54';
                        var res = $http.jsonp(rottenApiUrl + '&callback=JSON_CALLBACK')
                             .success(function(data) {
                                console.log("success! data: ", data)
                                return data;
                              })
                             .error(function(data,status) {console.log("rotten call failed");});
                        
                        // The rotten REST api sample :
                        // http://api.rottentomatoes.com/api/public/v1.0/movies.json?q=Toy&apikey=7ue5rxaj9xn4mhbmsuexug54
                 
                        // var rottenApiUrl = 'http://api.rottentomatoes.com/api/public/v1.0/movies.json?q=Toy&apikey=7ue5rxaj9xn4mhbmsuexug54';
                        // var res = $http.jsonp(rottenApiUrl + '&callback=JSON_CALLBACK')
                        //     .success(function(data) {console.log("success! data: ", data)})
                        //     .error(function(data,status) {console.log("rotten call failed. data returned :" + data);});
                        // console.log("res is :" + res);



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
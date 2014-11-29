'use strict';
var servicename = 'searchRotten';

module.exports = function(app) {

    //var dependencies = [];
    var dependencies = [];

    function service() {
        var isInitialized = false;

        var init = function() {
            isInitialized = true;
        };


        return {
            // initialization
            init: init,

            $get: ['$q', '$http',
                function($q, $http) {
                    var add = function(a, b) {
                        return a + b;
                    };

                    var searchMovies = function(query){


                        console.log("query : -" + query + "-");
                        var apikey = '7ue5rxaj9xn4mhbmsuexug54';
                        var rottenApiUrl = 'http://api.rottentomatoes.com/api/public/v1.0/movies.json';
                        var queryUrl = '?q=' + encodeURIComponent(query);
                        var pageLimitUrl = "&page_limit=50";
                        var pageUrl = "&page=1";
                        var apiKeyUrl = "&apikey=" + apikey;
                        var requestUrl = rottenApiUrl + queryUrl + pageLimitUrl + pageUrl + apiKeyUrl + '&callback=JSON_CALLBACK';
                        
                        // var res = $http.jsonp(requestUrl)
                        //      .success(function(data) {
                        //         console.log("success! data: ", data)
                        //         return data;
                        //       })
                        //      .error(function(data,status) {console.log("rotten call failed");});
    

                        var res = $http.jsonp(requestUrl)
                             .then(function(response) {
                                console.log("success! data: ", response.data);
                                return response.data;
                              }, function(response,status) {console.log("rotten call failed")});

                        //console.log("apikey : " + $httpProvider.defaults.headers.common["apikey"]);
                        // The rotten REST api sample :
                        // http://api.rottentomatoes.com/api/public/v1.0/movies.json?q=Toy&apikey=7ue5rxaj9xn4mhbmsuexug54
                 
                        // var rottenApiUrl = 'http://api.rottentomatoes.com/api/public/v1.0/movies.json?q=Toy&apikey=7ue5rxaj9xn4mhbmsuexug54';
                        // var res = $http.jsonp(rottenApiUrl + '&callback=JSON_CALLBACK')
                        //     .success(function(data) {console.log("success! data: ", data)})
                        //     .error(function(data,status) {console.log("rotten call failed. data returned :" + data);});
                        // console.log("res is :" + res);

                        return res;

                    };

                    return {
                        isInitialized: isInitialized,
                        add: add,
                        searchMovies: searchMovies,
                    };
                }
            ]
        };

    }
    service.$inject = dependencies;

    app.provider(app.name + '.' + servicename, service);
   
    app.config([app.name + '.' + servicename + "Provider", '$httpProvider',function(searchRotten, $httpProvider) {
        searchRotten.init();
    }]);

    // app.config(['$httpProvider', function ($httpProvider) {
    //     $httpProvider.defaults.headers.common['apikey']="7ue5rxaj9xn4mhbmsuexug54";
    //     $httpProvider.defaults.headers.common['Content-Type'] = 'application/json; charset=utf-8';
    // }]);
};
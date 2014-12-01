'use strict';
var servicename = 'searchRotten';

module.exports = function(app) {

    //var dependencies = [];
    var dependencies = [];

    function service() {
        var isInitialized = false;
        var page = 1;  // rotten api return an array limited with page_limit elements, 
                        // to get more items page property in query should be used.

        var res = null;

        var init = function() {
            isInitialized = true;
        };


        return {
            // initialization

            init: init,

            $get: ['$q', '$http',
                function($q, $http) {

                    var searchMovies = function(query){
                        if (query===null || page==26) return [];

                        console.log("query : -" + query + "-");
                        var apikey = '7ue5rxaj9xn4mhbmsuexug54';
                        var rottenApiUrl = 'http://api.rottentomatoes.com/api/public/v1.0/movies.json';
                        var queryUrl = '?q=' + encodeURIComponent(query);
                        var pageLimitUrl = "&page_limit=50";
                        var pageUrl = "&page=" + page;
                        var apiKeyUrl = "&apikey=" + apikey;
                        var requestUrl = rottenApiUrl + queryUrl + pageLimitUrl + pageUrl + apiKeyUrl + '&callback=JSON_CALLBACK';
                        
                        // var res = $http.jsonp(requestUrl)
                        //      .success(function(data) {
                        //         console.log("success! data: ", data)
                        //         return data;
                        //       })
                        //      .error(function(data,status) {console.log("rotten call failed");});
                        if (res != null) res.resolve();
                        res= $q.defer();
                        res = $http.jsonp(requestUrl);
                             // .then(function(response) {
                             //    //console.log("success! data: ", response.data);
                             //    return response.data;
                             //  }, function(response,status) {console.log("rotten call failed"); return [];});
                        console.log(res);

                        //console.log("apikey : " + $httpProvider.defaults.headers.common["apikey"]);
                        // The rotten REST api sample :
                        // http://api.rottentomatoes.com/api/public/v1.0/movies.json?q=Toy&apikey=7ue5rxaj9xn4mhbmsuexug54
                 
                        // var rottenApiUrl = 'http://api.rottentomatoes.com/api/public/v1.0/movies.json?q=Toy&apikey=7ue5rxaj9xn4mhbmsuexug54';
                        // var res = $http.jsonp(rottenApiUrl + '&callback=JSON_CALLBACK')
                        //     .success(function(data) {console.log("success! data: ", data)})
                        //     .error(function(data,status) {console.log("rotten call failed. data returned :" + data);});
                        // console.log("res is :" + res);
                        page = page + 1; 

                        return res;

                    };

                    var searchReset = function() {
                        page = 1;
                    };


                    return {
                        isInitialized: isInitialized,
                        searchMovies: searchMovies,
                        searchReset: searchReset
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
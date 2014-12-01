'use strict';
var servicename = 'searchRotten';

module.exports = function(app) {

    //var dependencies = [];
    var dependencies = [];

    function service() {
        var isInitialized = false;
        var page = 1;  // rotten api return an array limited results with page_limit elements, 
                        // to get more items the page property in query should be used.

        var reviewPage = 1 

        var res = null; // will hold a defer so we can drop previous promises, after query is updated.

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

                        // prepare restfull query url.
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

                    var searchReset = function() { // reset page parameter after search box is updated.
                        page = 1;
                    };

                    var getMovieInfo = function(movieId) { // get all movie details using rotten rest api.
 

                        // rotten api movie template :
                        //      http://api.rottentomatoes.com/api/public/v1.0/movies/770672122.json?apikey=[your_api_key]
                        // the api description :
                        //     http://developer.rottentomatoes.com/docs/json/v10/Movie_Info
                    

                        console.log("movie : -" + movie + "-");

                        // prepare restfull query url.
                        var apikey = '7ue5rxaj9xn4mhbmsuexug54';
                        var rottenApiUrl = 'http://api.rottentomatoes.com/api/public/v1.0/movies';
                        var movieIdUrl = "/"+movieId + ".json";
                        var apiKeyUrl = "&apikey=" + apikey;
                        var requestUrl = rottenApiUrl + apiKeyUrl + '&callback=JSON_CALLBACK';
 
                        if (res != null) res.resolve();
                        res= $q.defer();
                        res = $http.jsonp(requestUrl);

                    };

                    var getMovieReviews = function(movieId) {

                        // rotten api reviews template :
                        //     http://api.rottentomatoes.com/api/public/v1.0/movies/770672122/reviews.json?apikey=[your_api_key]                        
                        // the api description :
                        //     http://developer.rottentomatoes.com/docs/json/v10/Movie_Reviews

                        var apikey = '7ue5rxaj9xn4mhbmsuexug54';
                        var rottenApiUrl = 'http://api.rottentomatoes.com/api/public/v1.0/movies.json';
                        var movieIdUrl = "/"+movieId + "/reviews.json";
                        var pageLimitUrl = "&page_limit=50";
                        var pageUrl = "&page=" + page;
                        var countryUrl = "&country=us";
                        var reviewTypeUrl = "&review_type=top_critic";
                        var apiKeyUrl = "&apikey=" + apikey;

                        var requestUrl = rottenApiUrl + movieIdUrl + pageLimitUrl + pageUrl + countryUrl + reviewTypeUrl + apiKeyUrl + '&callback=JSON_CALLBACK';
 
                        if (res != null) {
                            console.log(res);
                            res.resolve();
                        };
                        res= $q.defer();
                        res = $http.jsonp(requestUrl);

                    }

                    return {
                        isInitialized: isInitialized,
                        searchMovies: searchMovies,
                        searchReset: searchReset,
                        getMovieInfo: getMovieInfo,
                        getMovieReviews: getMovieReviews
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

};
'use strict';
var controllername = 'searchRottenCtrl';

module.exports = function(app) {
    /*jshint validthis: true */
    console.log("bla");

    //var deps=[];
    var deps = ['$scope', '$q',app.name + '.searchRotten'];

    function controller($scope,$q, searchRotten) {
        console.log("blabla again");
        var vm = this;
        vm.message = 'Something is rotten here !';

        vm.movies = [];

        vm.MoreMoviesItems = true;

         /* vm.movies = [
            {
                "title":"bla will return",
                "synopsis":"bla bla movie bla",
                "posters.thumbnail":"1.jpg"
            }, 
           {    
                "title":"Bam man",
                "synopsis":"bam bam dam dam do",
                "posters.thumbnail":"2.jpg"
            },
            {
                "title":"Bla in the forest",
                "synopsis":"bla bla movie bla",
                "posters.thumbnail":"1.jpg"
            }, 
           {
                "title":"Bam man 2",
                "synopsis":"bam bam dam dam do",
                "posters.thumbnail":"2.jpg"
            }                           //movies mock
        ]; */

        //console.log("3+4=" + searchRotten.add(3,4));
        //console.log("http : " + searchRotten.searchMovies("a"));

        
        vm.searchUpdated = function(query) {  // call for search in rotten api
            console.log(query);
            vm.MoreMoviesItems = true;
            searchRotten.searchReset();
            var res = searchRotten.searchMovies(query);
            res.then(function(data) {
                vm.movies = [];
                console.log(data);
                vm.movies = data.data.movies;
            });

        };


        // support loading more movies for inifinite scroll vs. pagination.
        vm.loadMore = function() {
            console.log("loadMore");

 
            if (vm.query == null) {
                $scope.$broadcast('scroll.infiniteScrollComplete');
                return [];
            }

            var res = searchRotten.searchMovies(vm.query);
            res.then(function(data) {
                console.log('promise res :');
                console.log(data);
                if (data===null) {
                    vm.MoreMoviesItems = false;
                    return;
                };                
                console.log('promise res :');
                console.log(data);
                vm.movies = vm.movies.concat(data.data.movies);
                $scope.$broadcast('scroll.infiniteScrollComplete');
            });
        };

        $scope.$on('$stateChangeSuccess', function() {
            console.log('stateChangeSuccess');
            vm.loadMore();
        });

        //vm.movies = res[0];


        var activate = function() {

        };
        activate();
    }

    controller.$inject = deps;
    console.log(app.name + '.' + controllername);
    app.controller(app.name + '.' + controllername, controller);
};
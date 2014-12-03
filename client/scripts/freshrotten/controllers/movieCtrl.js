'use strict';
var controllername = 'movieCtrl';

module.exports = function(app) {
    /*jshint validthis: true */

    var deps = ['$scope','$q',app.name + '.searchRotten', '$stateParams'];

    function controller($scope,$q, searchRotten, $stateParams) {
        var vm = this;

        vm.reviews = [];
        vm.movie = {};
        vm.MoreReviewsItems = true;


        // vm.movie = {
        //         "title":"bla will return",
        //         "synopsis":"bla bla movie bla",
        //         "posters.thumbnail":"/media/1.jpg"
        // }

        // vm.reviews = [
        //     {
        //         "title":"bla will return",
        //         "synopsis":"bla bla movie bla",
        //         "posters.thumbnail":"1.jpg"
        //     }, 
        //    {    
        //         "title":"Bam man",
        //         "synopsis":"bam bam dam dam do",
        //         "posters.thumbnail":"2.jpg"
        //     },
        //     {
        //         "title":"Bla in the forest",
        //         "synopsis":"bla bla movie bla",
        //         "posters.thumbnail":"1.jpg"
        //     }, 
        //    {
        //         "title":"Bam man 2",
        //         "synopsis":"bam bam dam dam do",
        //         "posters.thumbnail":"2.jpg"
        //     }                           //movies mock
        // ]; 

        console.log($stateParams);
        vm.movie.id = $stateParams.movie_id;

        var res = searchRotten.getMovieInfo(vm.movie.id);

        res.then(function(data) {
          console.log("getMovieInfo :");
          console.log(data);
          vm.movie = data.data;
        });

        searchRotten.reviewsReset();
        res = searchRotten.getMovieReviews(vm.movie.id);
        res.then(function(data) {
          console.log("getMovieReviews : ");
          console.log(data);
          vm.reviews = vm.reviews.concat(data.data.reviews);
          $scope.$broadcast('scroll.infiniteScrollComplete');
        });


        vm.loadMore = function() {
            console.log("loadMore reviews");

            var res = searchRotten.getMovieReviews(vm.movie.id);

            res.then(function(data) {
                console.log("reviews res :")
                console.log(data);
                if (data===null) {
                    vm.MoreReviewsItems = false;
                    return;
                };        
                console.log(data);
                vm.reviews = vm.reviews.concat(data.data.reviews);
                $scope.$broadcast('scroll.infiniteScrollComplete');
                console.log(vm.reviews);
            });
        };

        $scope.$on('$stateChangeSuccess', function() {
            console.log('stateChangeSuccess');
            vm.loadMore();
        });


        var activate = function() {

        };
        activate();
    }

    controller.$inject = deps;
    app.controller(app.name + '.' + controllername, controller);
};
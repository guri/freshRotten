'use strict';
var controllername = 'movieCtrl';

module.exports = function(app) {
    /*jshint validthis: true */

    var deps = ['$scope','$q',app.name + '.searchRotten'];

    function controller($scope,$q, searchRotten) {
        var vm = this;
        vm.message = 'Hello World';
        vm.movie = {
                "title":"bla will return",
                "synopsis":"bla bla movie bla",
                "posters.thumbnail":"1.jpg"
        }

        vm.reviews = [
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
        ]; 

        //movie = searchRotten.getMovieInfo(movie.id);
        //reviews = searchRotten.getMovieReviews(movie.id);


        var activate = function() {

        };
        activate();
    }

    controller.$inject = deps;
    app.controller(app.name + '.' + controllername, controller);
};
'use strict';
var controllername = 'searchRottenCtrl';

module.exports = function(app) {
    /*jshint validthis: true */
    console.log("bla");

    //var deps=[];
    var deps = [app.name + '.searchRotten'];

    function controller(searchRotten) {
        console.log("blabla again");
        var vm = this;
        vm.message = 'Something is rotten here !';

        // vm.movies = [
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
        //     }                        
        // ];

        //console.log("3+4=" + searchRotten.add(3,4));
        //console.log("http : " + searchRotten.searchMovies("a"));

 
        
        vm.searchUpdated = function() {
            console.log(vm.query);
            var res = searchRotten.searchMovies(vm.query);
            res.then(function(data) {
                //console.log(data);
                vm.movies = data.movies;
            });

        };
        //vm.movies = res[0];


        var activate = function() {

        };
        activate();
    }

    controller.$inject = deps;
    console.log(app.name + '.' + controllername);
    app.controller(app.name + '.' + controllername, controller);
};
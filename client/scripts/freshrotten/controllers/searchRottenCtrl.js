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

        vm.movies = [
            {
                "title":"bla will return",
                "description":"bla bla movie bla",
                "thumbnailUrl":"1.jpg"
            }, 
           {    
                "title":"Bam man",
                "description":"bam bam dam dam do",
                "thumbnailUrl":"2.jpg"
            },
            {
                "title":"Bla in the forest",
                "description":"bla bla movie bla",
                "thumbnailUrl":"1.jpg"
            }, 
           {
                "title":"Bam man 2",
                "description":"bam bam dam dam do",
                "thumbnailUrl":"2.jpg"
            }                        
        ];

        console.log("3+4=" + searchRotten.add(3,4));


        var activate = function() {

        };
        activate();
    }

    controller.$inject = deps;
    console.log(app.name + '.' + controllername);
    app.controller(app.name + '.' + controllername, controller);
};
'use strict';
var controllername = 'movieCtrl';

module.exports = function(app) {
    /*jshint validthis: true */

    var deps = ['$scope','$q',app.name + '.searchRotten'];

    function controller($scope,$q, searchRotten) {
        var vm = this;
        vm.message = 'Hello World';
        vm.movies = {
                "title":"bla will return",
                "synopsis":"bla bla movie bla",
                "posters.thumbnail":"1.jpg"
        }

        var activate = function() {

        };
        activate();
    }

    controller.$inject = deps;
    app.controller(app.name + '.' + controllername, controller);
};
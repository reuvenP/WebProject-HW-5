/**
 * Created by reuvenp on 11/6/2016.
 */
var myapp = angular.module('myapp', ['ngRoute']);
myapp.config(function ($routeProvider) {
    $routeProvider
        .when('/', {
            templateUrl: 'index.ejs',
            controller  : 'mainController'
        })

        .when('/branches', {
            templateUrl: 'themes/js/branches.ejs',
            controller  : 'branchesController'
        });
});

myapp.controller('mainController', function ($scope) {

});
myapp.controller('branchesController', function ($scope) {

});
/**
 * Created by reuvenp on 11/6/2016.
 */
var myapp = angular.module('myapp', ['ngRoute']);
myapp.config(function ($routeProvider) {
    $routeProvider
        .when('/', {
            templateUrl: 'SPA/views/about.html',
        })

        .when('/branches', {
            templateUrl: 'SPA/views/branches.html',
            controller  : 'branchesController',
            controllerAs : 'branches'
        })

        .when('/flowers', {
            templateUrl: 'SPA/views/flowers.html',
            controller  : 'flowersController',
            controllerAs : 'flowers'
        });
}).controller('branchesController', ['$http',
    function branchesController($http) {
        var scope = this;
        $http.get('/getBranches').then(function (response) {
            scope.branchesList = response.data;
        }, function (response) {
            alert(response.statusText + " - " + response.data);
        });
}]).controller('flowersController', ['$http',
    function flowersController($http) {
        var scope = this;
        $http.get('/getFlowers').then(function (response) {
            scope.flowersList = response.data;
        }, function (response) {
            alert(response.statusText + " - " + response.data);
        });
    }]);

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
        })

        .when('/branchesManagement', {
            templateUrl: 'SPA/views/branchesManagement.html',
            controller  : 'branchesManagementController',
            controllerAs : 'branchesManagement'
        })
    ;
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
    }]).controller('branchesManagementController', ['$http',
    function branchesManagementController($http) {
        this.deleteRow = function (branch) {
            $http.get('/deleteBranch?branch_id=' + branch._id).then(function (response) {
                scope.branchesList = response.data;
            }, function (response) {
                alert(response.statusText + " - " + response.data);
            });
        };
        var scope = this;
        $http.get('/branchesManagement').then(function (response) {
            scope.branchesList = response.data;
        }, function (response) {
            alert(response.statusText + " - " + response.data);
        });
    }]);

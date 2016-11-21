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

        .when('/usersManagement', {
            templateUrl: 'SPA/views/usersManagement.html',
            controller  : 'usersManagementController',
            controllerAs : 'usersManagement'
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
        this.addBranch = function (branch) {
            if (!branch || !branch.name || !branch.location || !branch.openingHours){
                alert('Fill all the fields!');
            }
            $http.get('/addBranch?name=' + branch.name + '&num=' + branch.number + '&location=' + branch.location + '&h=' + branch.openingHours).then(function (response) {
                scope.branchesList = response.data;
            }, function (response) {
                alert(response.statusText + " - " + response.data);
            });
        };
        this.editBranch = function (branch) {
            $http.get('/editBranch?branch_id=' + branch._id + '&name=' + branch.name + '&location=' + branch.location + '&h=' + branch.openingHours).then(function (response) {
                scope.branchesList = response.data;
            }, function (response) {
                alert(response.statusText + " - " + response.data);
            });
        };
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
    }]).controller('usersManagementController', ['$http',
    function usersManagementController($http) {
        var scope=this;
        scope.addClient = function(user) {
            if (!user || !user.name || !user.username || !user.password){
                alert('Fill all required fields!');
            }
            $http.get('/addUser?name=' + user.name + '&username=' + user.username + '&password=' + user.password +
                        '&birthday=' + user.meta.birthday + '&website=' + user.meta.website + '&permission=0&branch_number=0')
                .then(function (response) {
                    scope.usersList = response.data;
                }, function (response) {
                    alert(response.statusText + " - " + response.data);
                });
        };
        scope.editUser = function (user) {
            $http.get('/editUser?user_id=' + user._id + '&name=' + user.name + '&username=' + user.username + '&password=' + user.password +
                        '&birthday=' + user.meta.birthday + '&website=' + user.meta.website + '&permission=0&branch_number=0')
                .then(function (response) {
                    scope.usersList = response.data;
                }, function (response) {
                    alert(response.statusText + " - " + response.data);
                });
        };
        scope.deleteUser = function (user) {
            $http.get('/deleteUser?user_id=' + user._id).then(function (response) {
                scope.usersList = response.data;
            }, function (response) {
                alert(response.statusText + " - " + response.data);
            });
        };
        $http.get('/getUsers').then(function (response) {
            scope.usersList = response.data;
        }, function (response) {
            alert(response.statusText + " - " + response.data);
        });
    }]);


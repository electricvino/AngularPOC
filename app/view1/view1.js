'use strict';

angular.module('myApp.view1', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/view1', {
    templateUrl: 'view1/view1.html',
    controller: 'View1Ctrl'
  });
}])

.controller('View1Ctrl', ['$scope', '$http',function($scope, $http) {
  $scope.model = {};

  $http.get('data/test.json').success(function(data) {
    $scope.model = data;
    //console.log('data = ' + data);
  });
}]);

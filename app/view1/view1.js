'use strict';

angular.module('myApp.view1', ['ngRoute', 'ngTouch', 'ui.grid'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/view1', {
    templateUrl: 'view1/view1.html',
    controller: 'View1Ctrl'
  });
}])

.controller('View1Ctrl', ['$scope', '$http',function($scope, $http) {
  $scope.model = {};
  $scope.model.SelectedProgram = {};

  $http.get('data/test.json').success(function(data) {
    $scope.model = data;
  //  $scope.SelectedProgram = data.SelectedProgram;
    console.log('data = ' + data);
  });

  $scope.selectProgram = function (program) {
    $scope.model.SelectedProgram = program;
  };
}]);

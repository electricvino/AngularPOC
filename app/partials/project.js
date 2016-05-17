'use strict';

angular.module('usageApp.Project', ['ngRoute'])
.controller('ProjectCtrl', ['$scope', '$http', function($scope, $http) {

  $scope.labels = ["Completed","Remaining"];
  //$scope.PieData = [500,700];

  $scope.RemainingObligation = $scope.model.SelectedProgram.TotalCommitment - $scope.model.SelectedProgram.TotalCommitmentCompleted;
  console.log('Remaining Oblig = ' + $scope.RemainingObligation);
  var graphData = [$scope.model.SelectedProgram.TotalCommitmentCompleted, $scope.RemainingObligation]
  console.log('graphData = ' + graphData);
  $scope.PieData = graphData;
}]);

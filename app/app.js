'use strict';

// Declare app level module which depends on views, and components
angular.module('usageApp', [
  'ngRoute',
  'ngRoute', 'ngTouch', 'ui.grid', 'ui.grid.edit', 'ui.grid.cellNav',
  'myApp.version', 'usageApp.Project', 'usageApp.Activity', 'usageApp.Issues', 'usageApp.Usage',
  'chart.js'
])
.config(['$routeProvider','$locationProvider', function($routeProvider, $locationProvider) {
  $routeProvider
    .when('/project',{templateUrl: 'partials/project-details.html', controller: 'ProjectCtrl'})
    .when('/activity',{templateUrl: 'partials/activity-details.html', controller: 'ActivityCtrl'})
    .when('/issues',{templateUrl: 'partials/issues.html', controller: 'IssuesCtrl'})
    .when('/usage',{templateUrl: 'partials/usage.html', controller: 'UsageCtrl'})
  .otherwise({redirectTo: '/'});
}])

.controller('UsageCtrl', ['$scope', '$http', 'uiGridConstants',function($scope, $http, uiGridConstants) {
  $scope.model = {};
  $scope.model.SelectedProgram = {};

  $http.get('data/test.json').success(function(data) {
    $scope.model = data;
    //$scope.SelectedProgram = data.SelectedProgram;
  });

  $scope.selectProgram = function (program) {
    $scope.model.SelectedProgram = program;
    $scope.gridOptions.data = $scope.model.SelectedProgram.Activities;
  };

  $scope.gridOptions = {
    enableFiltering: false,
    enableCellEditOnFocus: true,
    columnDefs: [
      {name:'id', headerTooltip: 'This is where text from definitions can go!', enableCellEdit: false, width: '4%'},
      {name: 'name', enableCellEdit: false, displayName: 'Name', width:'10%'},
      {name: 'EquipmentID', enableCellEdit: false, displayName: 'Equipment ID', width:'10%'},
      {name: 'Make', enableCellEdit: false, width:'7%'},
      {name: 'Model', enableCellEdit: false, displayName: 'Model', width:'8%'},
      {name: 'ModelYear', enableCellEdit: false, displayName: 'Model Yr', width:'5%'},
      {name: 'PerformingPartyID', headerTooltip: 'What do you call this activity?', displayName: 'Performing Party ID', width:'10%'},
      {name: 'CurrentMeterReadingPrimary', displayName: 'Primary Meter Reading', width:'10%'},
      {name: 'MeterDatePrimary', displayName: 'Primary Meter as of date', type: 'date', cellFilter: 'date:"MM/dd/yyyy"', width:'10%'},
      {name: 'CurrentMeterReadingSecondary', displayName: 'Secondary Meter Reading', width:'10%'},
      {name: 'MeterDateSecondary', displayName: 'Secondary Meter as of date', type: 'date', cellFilter: 'date:"MM/dd/yyyy"', width:'10%'},
      {name: 'UsagePercentPrimaryArea', displayName: 'Primary Area Usage (%)', width:'5%'},
      {name: 'UsagePercentSecondaryArea', displayName: 'Secondary Area Usage (%)', width:'5%'},
      {name: 'AddUsageInfo', displayName: 'More Usage Info', width:'6%'},
      {name: 'OperationalChanges', displayName: 'Operational Changes', width:'10%'}
    ],
    onRegisterApi: function( gridApi ) {
          $scope.gridApi = gridApi;
          gridApi.edit.on.afterCellEdit($scope,function(rowEntity, colDef, newValue, oldValue) {
            $scope.msg.lastCellEdited = 'edited row id:' + rowEntity.id + ' Column:' + colDef.name + ' newValue:' + newValue + ' oldValue:' + oldValue ;
            $scope.$apply();
          });
        }
  };

}]);

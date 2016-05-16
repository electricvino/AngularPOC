'use strict';

angular.module('myApp.view1', ['ngRoute', 'ngTouch', 'ui.grid', 'ui.grid.edit', 'ui.grid.cellNav'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/view1', {
    templateUrl: 'view1/view1.html',
    controller: 'View1Ctrl'
  });
}])

.controller('View1Ctrl', ['$scope', '$http', 'uiGridConstants',function($scope, $http, uiGridConstants) {
  $scope.model = {};
  $scope.model.SelectedProgram = {};

  $http.get('data/test.json').success(function(data) {
    $scope.model = data;
  //  $scope.SelectedProgram = data.SelectedProgram;
    //console.log('data = ' + data);


      // var $tabPane = $('.tab-pane'),
      //     tabsHeight = $('.nav-tabs').height();
      //
      // $tabPane.css({
      //   height: tabsHeight
      // });


  });

  $scope.selectProgram = function (program) {
    $scope.model.SelectedProgram = program;
    $scope.gridOptions.data = $scope.model.SelectedProgram.Activities;
  };

  $scope.msg = {};

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
      {name: 'TotalLifetimeUsage', displayName: 'Total Lifetime Usage', width:'10%'},
      {name: 'UsagePercentPrimaryArea', displayName: 'Primary Area Usage (%)', width:'5%'},
      {name: 'UsagePercentSecondaryArea', displayName: 'Secondary Area Usage (%)', width:'5%'},
      {name: 'AddUsageInfo', displayName: 'More Usage Info', width:'6%'},
      {name: 'OperationalChanges', displayName: 'Operational Changes', width:'10%'},
      {name: 'AdminComments', displayName: 'Administrative Comments', width:'10%'}
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

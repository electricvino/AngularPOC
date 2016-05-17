'use strict';

angular.module('myApp.view1', ['ngRoute', 'ngTouch', 'ui.grid', 'ui.grid.edit', 'ui.grid.cellNav'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/view1', {
    templateUrl: 'view1/view1.html',
    controller: 'View1Ctrl'
  });
}])

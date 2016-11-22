'use strict';
angular.module('LiftOff', ['ui.router','ui.bootstrap'])
.config(['$stateProvider', '$urlRouterProvider','$locationProvider', function($stateProvider, $urlRouterProvider,$locationProvider) {
	$locationProvider.html5Mode({
                enabled: true,
                requireBase: true
            });
	$urlRouterProvider.otherwise("/");
	  $stateProvider
    .state('home', {
      url: "/",
      templateUrl: "views/home.html",
      controller:"liftController"
    })
}]);
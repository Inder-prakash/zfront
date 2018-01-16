
var app = angular.module("myApp", ["ngRoute"] );

var BASE_URL = 'http://localhost:80/ZBACK'
	
app.config(function($routeProvider) {
    $routeProvider
    .when('/', {
        templateUrl : "home.html",
		controller : 'HomeController'
			
    }).when('/index', {
        templateUrl : "home.html",
		controller : 'HomeController'
    }).when('/home', {
        templateUrl : "home.html",
		controller : 'HomeController'
    }).when('/edit/:id', {
        templateUrl : "edit.html",
		controller : 'EditController'
    })
});
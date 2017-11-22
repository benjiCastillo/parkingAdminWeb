var app = angular.module('myApp', ['ngRoute', 'firebase']);

app.config(function($locationProvider, $routeProvider){
	$locationProvider.hashPrefix('');
  	$routeProvider
	.when('/', {
		controller: 'ListController',
		templateUrl: 'views/list.html'
	})
	.when('/add', {
		controller: 'AddController',
		templateUrl: 'views/add.html'
	})
	.when('/edit/:id', {
		controller: 'EditController',
		templateUrl: 'views/edit.html'
	})
	.otherwise({
		redirectTo: '/'
	});
    
});

var config = {
    apiKey: "AIzaSyD440F24slYaJbFwSkXWaF6M3XazBhU_k0",
    authDomain: "parkingsucre.firebaseapp.com",
    databaseURL: "https://parkingsucre.firebaseio.com",
    projectId: "parkingsucre",
    storageBucket: "parkingsucre.appspot.com",
    messagingSenderId: "524793348672"
  };
  firebase.initializeApp(config);



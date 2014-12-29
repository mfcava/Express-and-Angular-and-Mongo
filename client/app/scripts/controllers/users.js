'use strict';
 
angular.module('clientApp') // make sure this is set to whatever it is in your client/scripts/app.js
	.controller('UsersCtrl', function ($scope, $http) { // note the added $http depedency
		
	  $http.get('/users').
	    success(function(data, status, headers, config) {
	      $scope.users = data;
	    }).
	    error(function(data, status, headers, config) {
	      // called asynchronously if an error occurs
	      // or server returns response with an error status.
	     console.error('Status: '+status+' Data Dump :'+data);
	    });
		
		// In our signup.html, we'll be using the ng-model
		// attribute to populate this object.
		// signup.user = user = {};
 
		// This is our method that will post to our server.
		// signup.submit = function ()
		
		
	});

var app = angular.module('demo', ["ngRoute"]);
app.config(function($routeProvider) {
    $routeProvider
	.when("/", {
	    templateUrl : "main.htm"
	})
	.when("/user", {
	    templateUrl : "user.htm"
	})
	.when("/albums", {
	    templateUrl : "albums.htm"
	})
	.when("/post", {
	    templateUrl : "post.htm"
	});
});
app.controller('comments', function($scope, $http) {
    $http.get('https://jsonplaceholder.typicode.com/comments').
	then(function(response){
	    $scope.comments = response.data;
	});
});
app.controller('albums', function($scope, $http) {
    $http.get('https://jsonplaceholder.typicode.com/albums').
	then(function(response){
	    $scope.albums = response.data;
	});
});
app.controller('photos', function($scope, $http) {
    $http.get('https://jsonplaceholder.typicode.com/photos').
	then(function(response){
	    $scope.photos = response.data;
	});
});
app.controller('todos', function($scope, $http) {
    $http.get('https://jsonplaceholder.typicode.com/todos').
	then(function(response){
	    $scope.todos = response.data;
	});
});
app.controller('users', function($scope, $http) {
    $http.get('https://jsonplaceholder.typicode.com/users').
	then(function(response){
	    $scope.users = response.data;
	});
});


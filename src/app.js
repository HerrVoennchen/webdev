require('bootstrap/dist/css/bootstrap.min.css');
require('bootstrap/dist/css/bootstrap-theme.min.css');
require('font-awesome/css/font-awesome.min.css');

require('jquery');
require('bootstrap');

var angular = require('angular');
require('angular-route');


var app = angular.module('demo', []);

app.controller('comments', function($scope, $http) {
  $http.get('https://jsonplaceholder.typicode.com/comments').
  then(function(response) {
    $scope.comments = response.data;
  });
});
app.controller('albums', function($scope, $http) {
  $http.get('https://jsonplaceholder.typicode.com/albums').
  then(function(response) {
    $scope.albums = response.data;
  });
});
app.controller('photos', function($scope, $http) {
  $http.get('https://jsonplaceholder.typicode.com/photos').
  then(function(response) {
    $scope.photos = response.data;
  });
});
app.controller('todos', function($scope, $http) {
  $http.get('https://jsonplaceholder.typicode.com/todos').
  then(function(response) {
    $scope.todos = response.data;
  });
});
app.controller('users', function($scope, $http) {
  $scope.sortType = 'name'; // set the default sort type
  $scope.sortReverse = false; // set the default sort order
  $scope.searchUser = ''; // set the default search/filter term

  $http.get('https://jsonplaceholder.typicode.com/users').
  then(function(response) {
    $scope.users = response.data;
  });
});

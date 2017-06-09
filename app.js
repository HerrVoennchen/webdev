var app = angular.modul("demo", ["ngRoute"]);
app.config(function($routeProvider){
    $routeProvider.when("/",{
      templateUrl : "home.html",
      controller: "homeCtrl"
    }).when("/users",{
      templateUrl : "users.html",
      controller : "usersCtrls"
    })
});

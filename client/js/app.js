var app = angular.module('chatty', [
  'btford.socket-io'
]);

app.factory('dataServ', ['$http', function ($http) {
  return {
    get: function () {
      return $http.get('/data');
    }
  };
}]);

app.controller('appController', ['$scope', 'dataServ', function ($scope, Data) {

  $scope.funnyStuff = {question: '', answer: ''};

  Data.get()
    .success(function (resp) {
      $scope.funnyStuff = resp;
    });
}]);

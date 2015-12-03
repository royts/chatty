var app = angular.module('chatty', [
  'chatty.templates',
  'btford.socket-io',
  'ui.router'
])
  .config(function ($stateProvider, $urlRouterProvider, $locationProvider) {

    $locationProvider.html5Mode(true);

    $urlRouterProvider.otherwise("/login");
    $stateProvider
      .state('login', {
        url: "/login",
        templateUrl: "modules/login/login.html",
        controller: 'loginCtrl as login'
      })
      .state('chat', {
        url: "/chat",
        templateUrl: "modules/chat/chat.html",
        controller: 'chatCtrl',
        onEnter: function (userService, $state, $timeout) {
          if (!userService.name) {
            $timeout(function () {
              $state.go('login');

            });
          }
        },
      });
  });
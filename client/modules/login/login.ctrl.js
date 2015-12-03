angular.module('chatty')
  .controller('loginCtrl',
  function (userService, $state) {
    this.login = function () {
      userService.name = this.name;
      $state.go('chat');
    };

  });

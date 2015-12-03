angular.module('chatty')
  .controller('chatCtrl',
  function ($scope, socketService, $log) {
    function sendMessage(from, msg) {
      socketService.socket.emit(socketService.emitEventName, from, msg);
    }

    $scope.$on(socketService.forwardedEventName, function (event, data) {
      if (!data.message) {
        console.log.error('invalid message', 'event', event,
          'data', JSON.stringify(data));
        return;
      }
      console.log("got the message:", data.message, ", from:", data.from);
    });


    $scope.sendMessage = function () {
      sendMessage('roy', $scope.message);
      $scope.message = '';
    };
  });

angular.module('chatty')
  .controller('ChatCtrl',
  function ($scope, chatSocket, $log) {

    $scope.$on('socket:broadcast', function (event, data) {
      if (!data.payload) {
        $log.error('invalid message', 'event', event,
          'data', JSON.stringify(data));
        return;
      }
      $log.info("got the message:", data);
    });

    $scope.sendMessage = function () {
      chatSocket.emit('message', {
        name: 'roy',
        message: $scope.message
      });

      $scope.message = '';
    };
  });

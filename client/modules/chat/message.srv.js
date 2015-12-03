angular.module('chatty')
  .factory('socketService', function (socketFactory) {
    var socket = socketFactory();
    socket.forward('broadcast');
    return {
      emitEventName: 'message',
      forwardedEventName: 'socket:broadcast',
      socket: socket
    };
  });

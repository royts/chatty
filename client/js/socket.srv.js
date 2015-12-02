angular.module('chatty')
  .factory('chatSocket', function (socketFactory) {
    var socket = socketFactory();
    socket.forward('broadcast');
    return socket;
  });

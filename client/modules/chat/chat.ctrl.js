angular.module('chatty')
  .controller('chatCtrl',
  function ($scope, socketService, userService, $location, $anchorScroll) {
    function sendMessage(from, msg) {
      socketService.socket.emit(socketService.emitEventName, from, msg);
    }

    this.messages = [];
    this.myName = userService.name;

    $scope.$on(socketService.forwardedEventName, function (event, data) {
      if (!data.message) {
        console.log.error('invalid message.', 'event:', event,
          ' , data:', JSON.stringify(data));
        return;
      }

      var randomId = Math.random().toString(36).slice(2);

      this.messages.push({
        acronyms: data.from.charAt(0).toUpperCase() + data.from.charAt(data.from.length - 1).toUpperCase(),
        name: data.from,
        message: data.message,
        id: randomId
      });

      $location.hash(randomId);
      $anchorScroll();

      console.log("got the message:", data.message, ", from:", data.from);
    }.bind(this));


    this.sendMessage = function () {
      sendMessage(userService.name, this.message);
      this.message = '';
    };
  });

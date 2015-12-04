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

      function generateAcronyms(from) {
        var nameWords = data.from.split(' ');
        if (nameWords.length > 1) {
          return nameWords[0].charAt(0).toUpperCase() + nameWords[1].charAt(0).toUpperCase();
        }
        return data.from.charAt(0).toUpperCase() + data.from.charAt(data.from.length - 1).toUpperCase();
      }

      this.messages.push({

        acronyms: generateAcronyms(data.from),
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
      this.focusInput = true;
    };
  });

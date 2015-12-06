angular.module('chatty')
  .controller('chatCtrl',
  function ($scope, socketService, userService, $location, $anchorScroll) {
    function sendMessage(from, msg) {
      socketService.socket.emit(socketService.emitEventName, from, msg);
    }

    this.messages = [];
    this.myName = userService.name;

    function generateAcronyms(from) {
      var nameWords = from.split(' ');
      if (nameWords.length > 1) {
        return nameWords[0].charAt(0).toUpperCase() + nameWords[1].charAt(0).toUpperCase();
      }
      return from.charAt(0).toUpperCase() + from.charAt(from.length - 1).toUpperCase();
    }

    socketService.socket.emit('login', 'roy', 'hi');


    $scope.$on(socketService.forwardedEventName, function (event, data) {
      if (!data.message) {
        console.log('got an invalid message.', 'event:', event,
          ' , data:', JSON.stringify(data));
        return;
      }

      var randomId = Math.random().toString(36).slice(2);

      this.messages.push({
        acronyms: generateAcronyms(data.from),
        name: data.from,
        message: data.message,
        id: randomId
      });

      $location.hash(randomId);
      $anchorScroll();

    }.bind(this));


    this.sendMessage = function () {
      sendMessage(userService.name, this.message);
      this.message = '';
      this.focusInput = true;
    };
  });

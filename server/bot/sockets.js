var bot = require('./bot'),
format = require('./format');

module.exports = function (io) {

  console.log('socket.io: waiting for broadcasts');

  function sendWelcomeMessage(socketId) {

    io.to(socketId).emit('broadcast', {
      message: format.formatBotResponse(
        "Hi there! I'm going to be your Bot today!",
        "You can ask me questions, or ask for Chuck Norris funny fact. Try me!"
      ),
      from: "bot"
    });
  }

  io.on('connection', function (socket) {

    var socketId = socket.id;

    socket.on('login', function (e) {
      sendWelcomeMessage(socketId);
    });

    socket.on('message', function (from, msg) {

      //console.log('recieved message. from = ', from, " , msg = ", JSON.stringify(msg));
      var message = {
        message: msg,
        from: from
      };

      io.sockets.emit('broadcast', message);

      bot.newMessage(message).then(function (answer) {

        if (answer) {
          io.sockets.emit('broadcast', {
            message: answer,
            from: 'bot'
          });
        }
      });
    });
  });
};

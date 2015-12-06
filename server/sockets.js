var bot = require('./bot/bot');

module.exports = function (io) {

  console.log('socket.io: waiting for broadcasts');

  io.on('connection', function (socket) {

    socket.on('message', function (from, msg) {

      console.log('recieved message. from = ', from, " , msg = ", JSON.stringify(msg));
      //from, 'msg', JSON.stringify(msg));

      console.log('broadcasting message');

      console.log('payload is', msg);

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

      console.log('broadcast complete');
    });
  });
};

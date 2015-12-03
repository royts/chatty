module.exports = function (io) {

  console.log('socket.io: waiting for broadcasts');

  io.on('connection', function (socket) {

    socket.on('message', function (from, msg) {

      console.log('recieved message. from = ', from, " , msg = ", JSON.stringify(msg));
      //from, 'msg', JSON.stringify(msg));

      console.log('broadcasting message');

      console.log('payload is', msg);

      io.sockets.emit('broadcast', {
        message: msg,
        from: from
      });

      console.log('broadcast complete');
    });
  });
};

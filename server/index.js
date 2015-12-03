var express = require('express'),
app = express(),
port = 3000,
socketIo = require('socket.io'),
http = require('http'),
server = http.createServer(app),
io = socketIo.listen(server);


require('./routes.js')(app, express);
require('./sockets.js')(io);

server.listen(3000);

//app.listen(port);
console.log("Web server listening on port " + port);

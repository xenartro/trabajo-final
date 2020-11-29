const ircService = require('./irc');
const server = require('http').createServer();

const sockets = {};

const io = require('socket.io')(server, {
  path: '/middleware',
  serveClient: false,
  pingInterval: 10000,
  pingTimeout: 5000,
  cookie: false
});

io.on('connection', (socket) => {
  console.log('a user connected');

  socket.on('disconnect', () => {
    if (sockets[socket.userId]) {
      ircService.disconnect(socket.userId);

      sockets[socket.userId] = undefined;
    }

    console.log(`a user disconnected`);
  });

  function respond(event, payload) {
    socket.emit('response', { event, payload });
  }

  socket.on('command', (command) => {
    console.log(command);
    switch (command.command) {
      case 'identify':
        if (!sockets[command.payload.id]) {
          socket.userId = command.payload.id;
          sockets[command.payload.id] = socket;
        }

        respond('identify', { success: true });

        ircService.connect(command.payload, () => {
          respond('connection', { success: true });
        }, () => {
          respond('connection', { error: true });
        }, respond);
      break;
      case 'join':
        ircService.join(socket.userId, command.payload);
      break;
    }
  });
});

module.exports.init = function() {
  server.listen(80);
}

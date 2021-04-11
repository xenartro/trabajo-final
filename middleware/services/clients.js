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

  function respond(event, payload) {
    socket.emit('response', { event, payload });
  }

  socket.on('disconnect', () => {
    if (sockets[socket.userId]) {
      ircService.disconnect(socket.userId, respond);

      sockets[socket.userId] = undefined;
    }

    console.log(`a user disconnected`);
  });

  socket.on('command', (command) => {
    console.log(command);
    switch (command.command) {
      case 'connect':
        const user = command.payload;

        if (!sockets[user.id]) {
          socket.userId = user.id;
          sockets[user.id] = socket;
        }

        respond('connect', { success: true });

        ircService.connect(user, () => {
          respond('connected', { success: true });
        }, () => {
          respond('connected', { success: false, error: 'Could not connect to IRC' });
        }, respond);
      break;
      case 'join':
        ircService.join(socket.userId, command.payload, respond);
      break;
      case 'part':
        ircService.part(socket.userId, command.payload, respond);
      break;
      case 'message':
        ircService.say(socket.userId, command.payload.to, command.payload.message, respond);
      break;
      default:
        ircService.send(socket.userId, command.command, command.payload, respond);
    }
  });
});

module.exports.init = function() {
  server.listen(80);
}

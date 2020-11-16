const server = require('http').createServer();
const irc = require('irc');

const sockets = {};
const clients = {};

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
    console.log('user disconnected');
  });

  socket.on('command', (command) => {
    switch (command.command) {
      case 'identify':
        sockets[command.payload.id] = sockets[command.payload.id] || socket;

        if (clients[command.payload.id]) {
          socket.emit('response', { response: 'identify', sucess: true });
          socket.emit('response', { response: 'connected', sucess: true });

          return;
        }

        const client = new irc.Client('irc.freenode.org', command.payload.nickname, {
            realName: command.payload.name,
            debug: true,
            showErrors: true,
            encoding: 'UTF-8'
        });

        clients[command.payload.id]

        client.addListener('registered', () => {
          socket.emit('response', { response: 'connected', sucess: true });
        });
      break;
    }
  });
});

server.listen(80);

const server = require('http').createServer();

const clients = {};
const connections = {};

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
        clients[command.payload.id] = clients[command.payload.id] || socket;

        socket.emit('response', { response: 'identify', sucess: true });
      break;
    }
  });
});

server.listen(80);

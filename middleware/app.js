const server = require('http').createServer();

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

  socket.on('command', (msg) => {
    console.log('command: ' + msg);
  });
});

server.listen(80);

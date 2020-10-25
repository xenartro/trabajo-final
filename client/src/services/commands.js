import io from 'socket.io-client';

let socket;

export function init() {
  socket = io("ws://localhost", {
    path: '/middleware',
    reconnectionDelayMax: 10000,
    query: {
      auth: "123"
    }
  });
}

export function send(command) {
  socket.emit('command', command);
}

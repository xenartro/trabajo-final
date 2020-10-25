import io from 'socket.io-client';

let socket;

export function init() {
  socket = io("ws://localhost", {
    path: '/middleware',
    reconnectionDelayMax: 10000,
  });
}

export function send(command) {
  socket.emit('command', command);
}

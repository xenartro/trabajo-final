import io from 'socket.io-client';

let socket;

export function init() {
  socket = io("ws://localhost", {
    path: '/middleware',
    reconnectionDelayMax: 10000,
  });

  socket.on('response', (data) => {
    if (responseHandlers[data.response]) {
      responseHandlers[data.response](data);
    } else {
      console.warn(`No response handler registered for ${data.response}`);
    }
  })
}

let responseHandlers = {};

export function handleResponse(response, callback) {
  if (!socket) {
    throw new Error('No active socket');
  }

  responseHandlers[response] = callback;
}

export function send(command, payload) {
  socket.emit('command', { command, payload });
}

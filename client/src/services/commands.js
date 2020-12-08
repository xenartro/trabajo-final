import io from 'socket.io-client';

let socket;

export function init() {
  socket = io("ws://localhost", {
    path: '/middleware',
    reconnectionDelayMax: 10000,
  });

  socket.on('response', (data) => {
    if (responseHandlers[data.event]) {
      responseHandlers[data.event](data.payload);
    } else {
      console.warn(`No response handler registered for ${data.event}`, data.payload);
    }
  });
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

export function join(channel) {
  send('join', `#${channel}`);
}

export function parseAndSend(rawCommand) {
  const args = rawCommand.match(/\/([a-zA-Z]+) (.*)/);

  if (!args) {
    return false;
  }

  send(args[1], args[2]);
}

import io from 'socket.io-client';

let socket;
let messageHandler;

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
  });

  socket.on('message', (data) => {
    console.log('message', data);

    if (messageHandler) {
      messageHandler(data.from, data.to, data.message);
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

export function parseAndSend(rawCommand) {
  const args = rawCommand.match(/\/([a-zA-Z]+) (.*)/);

  if (!args) {
    return false;
  }

  send(args[1], args[2]);
}

export function registerMessageHandler(handler) {
  messageHandler = handler;
}

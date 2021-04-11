import io from 'socket.io-client';

let socket;

export function init({ onDisconnect }) {
  if (socket) {
    console.debug('init(): socket already initialized');

    return;
  }

  socket = io("ws://localhost", {
    path: '/middleware',
    reconnectionDelayMax: 10000,
  });

  socket.on('response', (data) => {
    console.log(data);

    if (responseHandlers[data.event]) {
      responseHandlers[data.event].forEach(callback => callback(data.payload));
    } else {
      console.warn(`No response handler registered for ${data.event}`, data.payload);
    }
  });

  socket.on("connect", () => {
    console.debug(socket.id);
  });

  socket.on("disconnect", () => {
    onDisconnect();
  });
}

let responseHandlers = {};

export function handleResponse(response, callback) {
  if (!socket) {
    return;
  }

  if (!responseHandlers[response]) {
    responseHandlers[response] = [];
  }

  responseHandlers[response].push(callback);
}

export function unHandleResponse(response, callback) {
  if (!responseHandlers[response]) {
    console.error(`No listeners registered for ${response}`);
    return;
  }

  responseHandlers[response] = responseHandlers[response].filter(fn => fn !== callback);
}

export function isCommand(message) {
  return message.startsWith('/');
}

export function send(command, payload) {
  socket.emit('command', { command, payload });
}

export function join(channel) {
  const channelName = channel.startsWith('#') ? channel : `#${channel}`;
  send('join', channelName);
}

export function part(channel) {
  send('part', `#${channel}`);
}

export function sendMessage(target, message) {
  const to = target.isChannel ? target.id : target.user.nickname;

  send('message', { to, message });
}

export function parseAndSend(rawCommand, target = null) {
  const parts = rawCommand.match(/\/([a-zA-Z]+)(?: )?(.*)/);

  if (!parts) {
    return false;
  }

  const command = parts[1];
  const args = target && target.isChannel && !parts[2].startsWith('#') ? `${target.id} ${parts[2]}` : parts[2];

  send(command, args.trim());
}

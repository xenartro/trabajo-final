import { init as initCommandsService, send as sendCommand, handleResponse  } from 'services/commands';

let connected = false;

export function connect(user, callback) {
  initCommandsService();

  handleResponse('identify', () => {
    connected = true;

    callback();
  })

  sendCommand('identify', user);
}

export function isConnected() {
  return connected;
}

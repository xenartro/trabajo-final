import { init as initCommandsService, send as sendCommand, handleResponse  } from 'services/commands';

let connected = false;

export function connect(user) {
  if (connected) {
    return Promise.resolve(true);
  }

  return new Promise((resolve, reject) => {
    initCommandsService({
      onDisconnect: () => {
        console.debug('Disconnected');
      }
    });

    handleResponse('identify', () => {
      console.log('User identified');
    });

    handleResponse('connection', (result) => {
      if (result.success) {
        connected = true;

        resolve(true);
      }

      reject(result);
    })

    sendCommand('identify', user);
  });
}

export function isConnected() {
  return connected;
}

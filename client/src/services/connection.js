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

    handleResponse('connected', (result) => {
      if (result.success) {
        connected = true;

        resolve(true);
        return;
      }

      reject(result);
    });

    handleResponse('connect', () => {
      // Only for debugging. The middleware identified us and requested a connection.
      console.log('User identified');
    });

    sendCommand('connect', user);
  });
}

export function isConnected() {
  return connected;
}

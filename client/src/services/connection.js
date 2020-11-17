import { init as initCommandsService, send as sendCommand, handleResponse  } from 'services/commands';

let connected = false;

export function connect(user, onSuccess, onError) {
  initCommandsService();

  handleResponse('identify', () => {
    console.log('User identified');
  });

  handleResponse('connection', (result) => {
    if (result.success) {
      connected = true;
      onSuccess();

      return;
    }

    onError();
  })

  sendCommand('identify', user);
}

export function isConnected() {
  return connected;
}

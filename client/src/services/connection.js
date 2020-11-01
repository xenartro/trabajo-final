import { init as initCommandsService } from 'services/commands';

let connected = false;

export function connect() {
  initCommandsService();

  connected = true;
}

export function isConnected() {
  return connected;
}

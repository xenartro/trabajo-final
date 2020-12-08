import Channel from './Channel';

class Workspace {
  constructor({ channels = [], conversations = [] } = {}) {
    this.channels = channels;
    this.conversations = conversations;
  }

  join(channelName) {
    const channel = new Channel({ name: channelName });

    this.channels.push(channel);
  }

  startConversation(username) {
    console.error('unimplemented');
  }

  static getDefault() {
    return new Workspace();
  }
}

export default Workspace;

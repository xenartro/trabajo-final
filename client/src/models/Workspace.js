import Channel from './Channel';

class Workspace {
  constructor(channels = [], conversations = []) {
    this.channels = channels;
    this.conversations = conversations;
  }

  static getDefault() {
    return new Workspace();
  }

  clone() {
    return new Workspace(this.channels, this.conversations);
  }

  join(channelName) {
    const channel = new Channel({ name: channelName });

    this.channels.push(channel);

    return channel;
  }

  startConversation(username) {
    console.error('unimplemented');
  }

  messageReceived(from, to, message) {
    let channel = this.channels.find(channel => channel.id === to);

    if (!channel) {
      channel = this.join(to.replace('#', ''));
    }

    channel.messages.push({
      from,
      message
    });
  }
}

export default Workspace;

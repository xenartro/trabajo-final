import Channel from './Channel';
import Conversation from './Conversation';

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

  findChannel(channelName) {
    return this.channels.find(({ name }) => name === channelName);
  }

  findConversation(username) {
    return this.conversations.find(({ nickname }) => nickname === username);
  }

  /**
   * @return Channel
   */
  join(channelName) {
    channelName = channelName.replace(/^#/, '');
    let channel = this.findChannel(channelName);

    if (channel) {
      return channel;
    }

    channel = new Channel({ name: channelName });

    this.channels.push(channel);

    return channel;
  }

  startConversation(nickname) {
    let conversation = this.findConversation(nickname);

    if (conversation) {
      return conversation;
    }

    conversation = new Conversation({ user: { nickname: nickname}});

    this.conversations.push(conversation);

    return conversation;
  }

  messageReceived(from, to, message) {
    let target = this.findChannel(to.replace('#', '')) || this.findConversation(to);

    if (!target) {
      target = to.charAt(0) === '#' ? this.join(to.replace('#', '')) : this.startConversation(to);
    }

    target.messages.push({
      from,
      message
    });
  }
}

export default Workspace;

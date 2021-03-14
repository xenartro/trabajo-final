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
    let target = this.findChannel(to) || this.findConversations(to);

    if (!target && to.charAt(0) === '#') {
      target = this.join(to.replace('#', ''));
    } else {
      target = this.startConversation(to);
    }

    target.messages.push({
      from,
      message
    });
  }
}

export default Workspace;

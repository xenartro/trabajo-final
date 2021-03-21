import Channel from './Channel';
import Conversation from './Conversation';

class Workspace {
  channels = [];
  conversations = [];
  activeChat = null;

  constructor(channels = [], conversations = [], activeChat = null) {
    this.channels = channels;
    this.conversations = conversations;
    this.activeChat = activeChat;
  }

  static getDefault() {
    return new Workspace();
  }

  clone() {
    return new Workspace(this.channels, this.conversations, this.activeChat);
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

    this.setActiveChat(channel);

    return channel;
  }

  setActiveChat(chat) {
    this.activeChat = chat;
  }

  part(channelName) {
    this.channels = this.channel.filter(channel => channel.name !== channelName);

    if (this.activeChat?.name === channelName) {
      this.setActiveChat(null);
    }
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

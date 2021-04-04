import Channel from './Channel';
import Conversation from './Conversation';
import User from './User';

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
    channelName = channelName.replace(/^#/, '');

    return this.channels.find(({ name }) => name === channelName);
  }

  findConversation(username) {
    return this.conversations.find(({ user }) => user.nickname === username);
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

  part(chat) {
    if (chat instanceof Conversation) {
      this.conversations = this.conversations.filter(conversation => conversation.user.nickname !== chat.user.nickname);
      return;
    }

    this.channels = this.channels.filter(channel => channel.name !== chat.name);

    if (this.activeChat?.id === chat.id) {
      this.setActiveChat(null);
    }
  }

  startConversation(nickname) {
    let conversation = this.findConversation(nickname);

    if (conversation) {
      return conversation;
    }

    conversation = new Conversation({ nickname });

    this.conversations.push(conversation);

    return conversation;
  }

  messageReceived(from, to, message) {
    let target = this.findChannel(to) || this.findConversation(from);

    if (!target) {
      target = to.charAt(0) === '#' ? this.join(to.replace('#', '')) : this.startConversation(from);
    }

    target.messages.push({
      from,
      message
    });
  }

  messageSent(from, target, message) {
    target.messages.push({
      from,
      message
    });
  }

  receivedUserList(channelName, nicknames) {
    const channel = this.findChannel(channelName);

    if (!channel) {
      console.error(`Received user list from channel not found ${channelName}`);
      return;
    }

    channel.receivedUserList(nicknames);
  }

  receivedTopic(channelName, topic) {
    const channel = this.findChannel(channelName);
    channel.topic = topic;
  }

  userJoined(channelName, nickname) {
    const channel = this.findChannel(channelName);
    channel.addUser(nickname);

    const user = User.find(nickname);
    user.online = true;
  }

  userLeft(channelName, nickname) {
    const channel = this.findChannel(channelName);
    channel.removeUser(nickname);
  }

  userDisconnected(nickname) {
    const user = User.find(nickname);
    user.online = false;
  }

  userNicknameChanged(oldNick, newNick) {
    const user = User.find(oldNick);
    user.nickname = newNick;
  }

  receivedUserInfo(nickname, name, username, host) {
    const user = User.find(nickname);
    user.setUserInfo(nickname, name, username, host);
  }
}

export default Workspace;

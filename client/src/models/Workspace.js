import Channel from './Channel';
import Conversation from './Conversation';
import User from './User';

class Workspace {
  static channels = [];
  static conversations = [];
  static activeChat = null;

  static getDefault() {
    return new Workspace();
  }

  get channels() {
    return Workspace.channels;
  }

  get conversations() {
    return Workspace.conversations;
  }

  get activeChat() {
    return Workspace.activeChat;
  }

  set channels(channels) {
    Workspace.channels = channels;
  }

  set conversations(conversations) {
    Workspace.conversations = conversations;
  }

  set activeChat(activeChat) {
    Workspace.activeChat = activeChat;
  }

  clone() {
    return new Workspace();
  }

  findChannel(channelName) {
    channelName = channelName.replace(/^#/, '');

    return this.channels.find(({ name }) => name === channelName);
  }

  findOrCreateChannel(channelName) {
    channelName = channelName.replace(/^#/, '');

    let channel = this.findChannel(channelName);

    if (!channel) {
      channel = new Channel({ name: channelName });

      this.channels.push(channel);
    }

    return channel;
  }

  findConversation(username) {
    return this.conversations.find(({ user }) => user.nickname === username);
  }

  /**
   * @return Channel
   */
  join(channelName) {
    channelName = channelName.replace(/^#/, '');
    const channel = this.findOrCreateChannel(channelName);

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

    target.addMessage({
      from,
      message
    });
  }

  messageSent(from, target, message) {
    target.addMessage({
      from,
      message
    });
  }

  receivedUserList(channelName, nicknames) {
    const channel = this.findOrCreateChannel(channelName);

    if (!channel) {
      console.error(`Received user list from channel not found ${channelName}`);
      return;
    }

    channel.receivedUserList(nicknames);
  }

  receivedTopic(channelName, topic) {
    const channel = this.findOrCreateChannel(channelName);
    channel.topic = topic;
  }

  userJoined(channelName, nickname) {
    const channel = this.findOrCreateChannel(channelName);
    channel.addUser(nickname);

    const user = User.find(nickname);
    user.online = true;
  }

  userLeft(channelName, nickname) {
    const channel = this.findChannel(channelName);

    if (channel) {
      channel.removeUser(nickname);
    }
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

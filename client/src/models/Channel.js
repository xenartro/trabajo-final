import User from 'models/User';

class Channel {
  users = [];
  isChannel = true;

  constructor({ name, topic }) {
    this.name = name;
    this.id = `#${name}`;
    this.topic = topic;
    this.messages = [];
  }

  /**
   * Format: { nick: status, nick2: status }
   */
  receivedUserList(nicknames) {
    for (const nickname in nicknames) {
      this.addUser(nickname);
    }
  }

  addUser(nickname) {
    const user = User.find(nickname);

    if (!this.users.includes(user)) {
      this.users.push(user);
    }
  }

  removeUser(nickname) {
    const user = User.find(nickname);

    this.users = this.users.filter(channelUser => channelUser !== user);
  }
}

export default Channel;

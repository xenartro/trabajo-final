import User from 'models/User';

class Channel {
  users = [];

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
      this.users.push(User.find(nickname));
    }
  }
}

export default Channel;

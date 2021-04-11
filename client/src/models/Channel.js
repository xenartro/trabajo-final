import User from 'models/User';
import { getMessageHistory, setMessageHistory } from 'services/messages';

class Channel {
  users = [];
  isChannel = true;

  constructor({ name, topic }) {
    this.name = name;
    this.id = `#${name}`;
    this.topic = topic;
    this.messages = getMessageHistory(this.id);
  }

  get displayName() {
    return this.name;
  }

  addMessage(message) {
    this.messages.push(message);

    setMessageHistory(this.id, this.messages);
  }

  addUser(nickname) {
    const user = User.find(nickname);

    if (!this.users.includes(user)) {
      this.users.push(user);
    }
  }

  /**
   * Format: { nick: status, nick2: status }
   */
  receivedUserList(nicknames) {
    for (const nickname in nicknames) {
      this.addUser(nickname);
    }
  }

  removeUser(nickname) {
    const user = User.find(nickname);

    this.users = this.users.filter(channelUser => channelUser !== user);
  }
}

export default Channel;

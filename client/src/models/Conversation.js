import User from 'models/User';
import { getMessageHistory, setMessageHistory } from 'services/messages';

class Conversation {
  messages = [];

  constructor({ nickname, messages = [] }) {
    this.user = User.find(nickname);

    getMessageHistory(this.user.nickname)
      .then(messages => this.messages = messages);
  }

  get displayName() {
    return this.user.displayName;
  }

  addMessage(message) {
    this.messages.push(message);

    setMessageHistory(this.user.nickname, this.messages);
  }
}

export default Conversation;

import User from 'models/User';
import { getMessageHistory, setMessageHistory } from 'services/messages';

class Conversation {
  constructor({ nickname, messages = [] }) {
    this.user = User.find(nickname);
    this.messages = getMessageHistory(this.user.nickname);
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

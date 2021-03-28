import User from 'models/User';

class Conversation {
  constructor({ nickname, messages = [] }) {
    this.user = User.find(nickname);
    this.messages = messages || [];
  }
}

export default Conversation;

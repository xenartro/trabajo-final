export default class Message {
  constructor({ type, from, message, ts }) {
    this.type = type;
    this.from = from;
    this.message = message;
    this.ts = ts;
  }

  userMentioned(user) {
    if (this._mentioned !== undefined) {
      return false;
    }

    this._mentioned = this.message.toLowerCase().includes(user.nickname.toLowerCase());
    if (this._mentioned) {
      this.message = this.message.replace(user.nickname, `**${user.nickname}**`);
    }

    return this._mentioned;
  }

  get notified() {
    return this._mentioned !== undefined;
  }
}

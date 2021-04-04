import uniqid from 'uniqid';

// Global list of users.
const users = [];

export default class User {
  online = true;

  constructor({ id, name = '', email = '', nickname }) {
    this.id = id || uniqid();
    this.name = name;
    this.email = email;
    this.nickname = nickname;

    users.push(this);
  }

  static find(userNickname) {
    let user = users.find(({ nickname }) => nickname === userNickname);

    if (!user) {
      user = new User({ nickname: userNickname });
    }

    return user;
  }
}

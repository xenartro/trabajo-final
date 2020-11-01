import uniqid from 'uniqid';

export default class User {
  constructor({ id, name, email, nickname }) {
    this.id = id || uniqid();
    this.name = name;
    this.email = email;
    this.nickname = nickname;
  }
}

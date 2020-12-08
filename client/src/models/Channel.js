class Channel {
  constructor({ name, topic }) {
    this.name = name;
    this.id = `#${name}`;
    this.topic = topic;
    this.messages = [];
  }
}

export default Channel;

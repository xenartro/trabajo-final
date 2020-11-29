const irc = require('irc');

const clients = {};

module.exports.connect = function(user, onSuccess, onError, onMessage) {
  if (clients[user.id]) {
    onSuccess();

    return;
  }

  const client = new irc.Client('irc.freenode.org', user.nickname, {
      realName: user.name,
      debug: true,
      showErrors: true,
      //encoding: 'UTF-8'
  });

  clients[user.id] = client;

  client.addListener('registered', () => {
    onSuccess();
  });

  client.addListener('message', (nick, to, text, message) =>  {
    onMessage(nick, to, text);
  })
}

module.exports.join = function (userId, channel) {
  clients[userId].join(channel);
}

module.exports.disconnect = function (userId) {
  if (clients[userId]) {
    clients[userId].disconnect();
  }
}

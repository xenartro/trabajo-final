const irc = require('irc');

const clients = {};

module.exports.connect = function(user, onSuccess, onError) {
  if (clients[user.id]) {
    onSucces();

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
}

module.exports.disconnect = function (userId) {
  if (clients[userId]) {
    clients[userId].disconnect();
  }
}

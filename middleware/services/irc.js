const irc = require('irc');

const clients = {};

module.exports.connect = function(user, onSuccess, onError, handleEvent) {
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

  client.addListener('message', (nick, to, text) =>  {
    handleEvent('message', { from: nick, to, message: text });
  });

  client.addListener('names', (channel, nicknames) =>  {
    handleEvent('user_list', { channel, nicknames });
  });

  client.addListener('topic', (channel, topic, nickname) =>  {
    handleEvent('topic', { channel, topic, nickname });
  });

  client.addListener('join', (channel, nickname) =>  {
    handleEvent('join', { channel, nickname });
  });

  client.addListener('part', (channel, nickname) =>  {
    handleEvent('part', { channel, nickname });
  });

  client.addListener('quit', (nickname, reason) =>  {
    handleEvent('quit', { nickname, reason });
  });

  client.addListener('kick', (channel, nickname, by, reason) =>  {
    handleEvent('kick', { channel, nickname, by, reason });
  });

  client.addListener('nick', (oldnick, newnick) =>  {
    handleEvent('nick', { oldnick, newnick });
  });

  client.addListener('invite', (channel, from) =>  {
    handleEvent('invited', { oldnick, newnick });
  });

  client.addListener('+mode', (channel, by, mode, argument) =>  {
    handleEvent('+mode', { channel, by, mode, argument });
  });

  client.addListener('-mode', (channel, by, mode, argument) =>  {
    handleEvent('-mode', { channel, by, mode, argument });
  });

  client.addListener('whois', ({ nick, user, realname, host }) =>  {
    handleEvent('whois', { nickname: nick, user, name: realname, host });
  });

  client.addListener('error', function(message) {
    console.log('error: ', message);
    handleEvent('error', { message });
  });
}

function isUserConnectionActive(userId, handleEvent) {
  if (!clients[userId]) {
    handleEvent('disconnected', {});

    return false;
  }

  return true;
}

module.exports.say = function (userId, to, message, handleEvent) {
  if (!isUserConnectionActive(userId, handleEvent)) {
    return;
  }

  clients[userId].say(to, message);
}

module.exports.join = function (userId, channel, handleEvent) {
  if (!isUserConnectionActive(userId, handleEvent)) {
    return;
  }

  clients[userId].join(channel);
}

module.exports.part = function (userId, channel, handleEvent) {
  if (!isUserConnectionActive(userId, handleEvent)) {
    return;
  }

  clients[userId].part(channel);
}

module.exports.disconnect = function (userId, handleEvent) {
  if (clients[userId]) {
    clients[userId].disconnect();

    clients[userId] = undefined;

    handleEvent('disconnected', {});
  }
}

module.exports.send = function (userId, command, args, handleEvent) {
  if (!isUserConnectionActive(userId, handleEvent)) {
    return;
  }

  let argList = args.split(' ');

  if (argList.length >= 1 && argList[0].startsWith('#')) {
    argList = [...argList.splice(0, 1), argList.join(' ')];
  }

  clients[userId].send(command, ...argList);
}

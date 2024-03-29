import localForage from 'localforage';

export async function searchMessages(text) {
  const results = [];

  await localForage.iterate(function (messages, key) {
    const channel = key.split('#')[1];

    const result = {
      channel,
      messages: messages.filter(message => (message.type === 'message' && message.message.includes(text)))
    };

    if (result.messages.length > 0) {
      results.push(result);
    }
  });

  return results;
}

/**
 * Receive a plain text message and add Markdown syntax where needed. For example
 * links.
 */
export function stringToMarkdown(message) {
  const urlRegex = /(?:www|http:|https:)+[^\s]+[\w]/;

  message = applyRegexTransformation(message, urlRegex, urlMarkdownTransformation);

  return message;
}

export function notify(message) {
  if (!("Notification" in window)) {
    return false;
  }

  if (Notification.permission === "granted") {
     new Notification(message);

     return true;
  }

  if (Notification.permission !== "denied") {
    Notification.requestPermission().then(function (permission) {
      if (permission === "granted") {
        new Notification(message);
      }
    });
  }
}

function applyRegexTransformation(message, regex, transformation) {
  const matches = regex.exec(message);

  matches?.forEach(match => {
    message = message.replace(match, transformation(match));
  });

  return message;
}

function urlMarkdownTransformation(url) {
  const preview = url;
  url = !url.startsWith('http') ? `http://${url}` : url;

  let prefix = '';

  if (url.endsWith('.jpg') || url.endsWith('.png') || url.endsWith('.gif')) {
    prefix = '!';
  }

  return `${prefix}[${preview}](${url})`;
}

/**
 * Get the message history for a given key.
 */
export async function getMessageHistory(key) {
  const history = await localForage.getItem(`history_${key}`);

  if (!history) {
    console.log(`Message history not found for key ${key}`);

    return [];
  }

  return history;
}

/**
 * Set the message history for a given key.
 */
export function setMessageHistory(key, messages) {
  localForage.setItem(`history_${key}`, messages);
}

/**
 * Return a user-friendly string describing an event.
 */
export function eventToString(event) {
  switch (event) {
    case 'join':
      return 'Entró al canal';
    case 'part':
      return 'Salió del canal';
    default:
      return 'Evento no implementado';
  }
}

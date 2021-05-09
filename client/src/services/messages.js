import localForage from 'localforage';

/**
 * Receive a plain text message and add Markdown syntax where needed. For example
 * links.
 */
export function stringToMarkdown(message) {
  const urlRegex = /(?:www|http:|https:)+[^\s]+[\w]/;

  message = applyRegexTransformation(message, urlRegex, urlMarkdownTransformation);

  return message;
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

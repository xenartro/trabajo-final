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

  return `[${preview}](${url})`;
}

export function getMessageHistory(key) {
  const history = localStorage.getItem(`history_${key}`);

  if (!history) {
    console.log(`Message history not found for key ${key}`);

    return [];
  }

  try {
    return JSON.parse(history);
  } catch(e) {
    console.error(e);
  }

  return [];
}

export function setMessageHistory(key, messages) {
  localStorage.setItem(`history_${key}`, JSON.stringify(messages));
}

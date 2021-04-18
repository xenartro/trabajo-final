import dayjs from 'dayjs';
import ReactMarkdown from 'react-markdown';
import './message.css';
import { stringToMarkdown } from 'services/messages';

function Timestamp(message) {
  if (!message.ts) {
    return null;
  }

  const ts = dayjs.unix(message.ts);
  const now = dayjs().unix();

  const timestamp = (now - ts > 86400) ? ts.fromNow() : ts.format('H:mm');

  return (<small>{timestamp}</small>);
}

const Message = ({ message }) => {
  return (
    <div>
      <div><strong>{message.from}</strong>: {Timestamp(message)}</div>
      <ReactMarkdown className="chat__message">{stringToMarkdown(message.message)}</ReactMarkdown>
    </div>
  )
}

export default Message;

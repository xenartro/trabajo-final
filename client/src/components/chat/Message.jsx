import dayjs from 'dayjs';
import ReactMarkdown from 'react-markdown';
import User from './User';
import 'styles/message.css';
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
    <div className="irc__message">
      <User  avatarOnly user={message.from} />
      <div className="irc__message__bubble">
        <div className="irc__message__bubble__author">
          {message.from}: {Timestamp(message)}
        </div>
        <div className="irc__message__bubble__meesage">
          <ReactMarkdown>{stringToMarkdown(message.message)}</ReactMarkdown>
        </div>
      </div>
    </div>
  )
}

export default Message;

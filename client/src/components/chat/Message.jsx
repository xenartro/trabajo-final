import ReactMarkdown from 'react-markdown';
import Timestamp from './Timestamp';
import './message.css';
import { stringToMarkdown } from 'services/messages';

const Message = ({ message }) => {
  return (
    <div>
      <div><strong>{message.from}</strong>: <Timestamp event={message} /></div>
      <ReactMarkdown className="chat__message">{stringToMarkdown(message.message)}</ReactMarkdown>
    </div>
  )
}

export default Message;

import ReactMarkdown from 'react-markdown';
import './message.css';
import { stringToMarkdown } from 'services/messages';

const Message = ({ message }) => {
  return (
    <div>
      {message.from}: <ReactMarkdown className="chat__message">{stringToMarkdown(message.message)}</ReactMarkdown>
    </div>
  )
}

export default Message;

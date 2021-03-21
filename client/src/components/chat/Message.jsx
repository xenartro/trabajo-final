import ReactMarkdown from 'react-markdown';
import './message.css';

const Message = ({ message }) => {
  return (
    <div>
      {message.from}: <ReactMarkdown className="chat__message">{message.message}</ReactMarkdown>
    </div>
  )
}

export default Message;

import ReactMarkdown from 'react-markdown';
import User from './User';
import 'styles/message.css';
import { stringToMarkdown } from 'services/messages';

const Message = ({ message }) => {
  console.log(message)
  return (
    <div className="irc__message">
      <User  avatarOnly user={message.from} />
      <div className="irc__message__bubble">
        <div className="irc__message__bubble__author">
          {message.from}:
        </div>
        <div className="irc__message__bubble__meesage">
          <ReactMarkdown>{stringToMarkdown(message.message)}</ReactMarkdown>
        </div>
      </div>
    </div>
  )
}

export default Message;

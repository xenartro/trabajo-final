import ReactMarkdown from 'react-markdown';
import Timestamp from './Timestamp';
import User from './User';
import 'styles/message.css';
import { stringToMarkdown } from 'services/messages';

const Message = ({ message }) => {
  return (
    <div className="irc__message">
      <User  avatarOnly user={message.from} />
      <div className="irc__message__bubble">
        <div className="irc__message__bubble__author">
          {message.from}: : <Timestamp event={message} />
        </div>
        <div className="irc__message__bubble__meesage">
          <ReactMarkdown>{stringToMarkdown(message.message)}</ReactMarkdown>
        </div>
      </div>
    </div>
  )
}

export default Message;

import ReactMarkdown from 'react-markdown';
import Timestamp from './Timestamp';
import User from './User';
import { notify, stringToMarkdown } from 'services/messages';
import { useUserContext } from 'components/context/User';
import 'styles/message.css';

const Message = ({ message, previousMessage }) => {
  const hideAuthor = previousMessage && previousMessage.type === 'message' && previousMessage.from === message.from && (message.ts - previousMessage.ts) < 60;
  const { user } = useUserContext();

  if (message.userMentioned && message.userMentioned(user)) {
    notify(`${message.from} te mencionó`);
  }

  return (
    <div className="irc__message">
      <User  avatarOnly user={message.from} />
      <div className="irc__message__bubble">
        {!hideAuthor && (
          <div className="irc__message__bubble__author">
            {message.from}: <Timestamp event={message} />
          </div>
        )}
        <div className="irc__message__bubble__message">
          <ReactMarkdown>{stringToMarkdown(message.message)}</ReactMarkdown>
        </div>
      </div>
    </div>
  )
}

export default Message;

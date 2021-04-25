import Event from './Event';
import Message from './Message';
import UserList from './UserList';
import User from './User';
import { useState, } from 'react';
import { useUserContext } from 'components/context/User';
import { useWorkspace } from 'components/context/Workspace';
import 'styles/chat.css';

const Chat = () => {
  const [message, setMessage] = useState('');
  const { say, workspace } = useWorkspace();
  const { user } = useUserContext();

  function handleChange(e) {
    setMessage(e.currentTarget.value);
  }

  function submit(e) {
    e.preventDefault();

    say(target, message);

    setMessage('');
  }

  if (!workspace.activeChat) {
    return (<NoActiveChat />)
  }

  const target = workspace.activeChat;

  return (

        <div className="irc-chat-container">
          {target.isChannel && (
              <UserList channel={target} />
          )}
          <div className="irc-chat-body">
            <div className="chat-content">

              {target.isChannel && (
                  <h1>#{target.displayName}</h1>
              )}
              {!target.isChannel && (
                  <h1>{target.displayName} <User user={target.displayName}  avatarOnly/></h1>
              )}
              {target.topic && (
                <div className="irc-chat-body__topic">
                  <h3>{target.topic}</h3>
                </div>
              )}

              {target.messages.map((message, i) => (
                message.type === 'message' ? <Message key={i} message={message} /> : <Event key={i} event={message} />
              ))}
            </div>
          </div>
          <div className="irc-chat-input">
            <div className="irc-chat-input__box">
              <User user={user.nickname} color="1" avatarOnly/>
              <div className="box_input">
                <form onSubmit={submit}>
                  <input type="text" value={message} onChange={handleChange} />
                  <button type="submit">Enviar</button>
                </form>
              </div>
            </div>
          </div>
        </div>

  )
};

function NoActiveChat() {
  return (
    <div className="irc-chat-container">
      <div className="irc-chat-body">
        <h1>
        Let's Chat
        </h1>

        <p>Seleccioná una conversación del menú o unite a un canal.</p>
      </div>
    </div>
  )
}

export default Chat;

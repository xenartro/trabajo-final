import Message from './Message';
import { useState, } from 'react';
import { useWorkspace } from 'components/context/Workspace';

const Chat = () => {
  const [message, setMessage] = useState('');
  const { say, workspace } = useWorkspace();

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
    <div>
      <div>{target.name}</div>

      {target.messages.map((message, i) => (
        <Message key={i} message={message} />
      ))}

      <form onSubmit={submit}>
        <input type="text" value={message} onChange={handleChange} />

        <button type="submit">Enviar</button>
      </form>
    </div>
  )
};

function NoActiveChat() {
  return (
    <div>
      Seleccioná una conversación del menú o unite a un canal.
    </div>
  )
}

export default Chat;

import Message from './Message';
import { useState, } from 'react';
import { useWorkspace } from 'components/context/Workspace';

const Chat = ({ target }) => {
  const [message, setMessage] = useState('');
  const { say } = useWorkspace();

  function handleChange(e) {
    setMessage(e.currentTarget.value);
  }

  function submit(e) {
    e.preventDefault();

    say(target, message);

    setMessage('');
  }

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

export default Chat;

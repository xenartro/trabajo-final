import { useState, } from 'react';
import { sendMessage } from 'services/commands';

const Chat = ({ target }) => {
  const [message, setMessage] = useState('');

  function handleChange(e) {
    setMessage(e.currentTarget.value);
  }

  function submit(e) {
    e.preventDefault();

    sendMessage(target.id, message);

    setMessage('');
  }

  return (
    <div>
      <div>{target.name}</div>

      {target.messages.map((message, i) => (
        <div key={i}>{message.from}: {message.message}</div>
      ))}

      <form onSubmit={submit}>
        <input type="text" value={message} onChange={handleChange} />

        <button type="submit">Enviar</button>
      </form>
    </div>
  )
};

export default Chat;

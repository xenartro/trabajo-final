import { useState, useEffect } from 'react';
import { parseAndSend, handleResponse } from 'services/commands';

const Chat = ({ target }) => {
  const [messages, setMessages] = useState([]);
  const [command, setCommand] = useState('');

  function handleChange(e) {
    setCommand(e.currentTarget.value);
  }

  function submit(e) {
    e.preventDefault();

    parseAndSend(command);

    setCommand('');
  }

  useEffect(() => {
    handleResponse('message', ({ from, to, message }) => {
      setMessages([...messages, { from, to, message }]);
    });
    return () => {
      handleResponse('message', undefined);
    }
  }, []); // eslint-disable-line

  return (
    <div>
      <div>{target.name}</div>

      {target.messages.map((message, i) => (
        <div key={i}>{message.from} -> {message.to}: {message.message}</div>
      ))}

      <form onSubmit={submit}>
        <input type="text" value={command} onChange={handleChange} />

        <button type="submit">Enviar</button>
      </form>
    </div>
  )
};

export default Chat;

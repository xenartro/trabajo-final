import Event from './Event';
import Message from './Message';
import UserList from './UserList';
import { Col, Row } from 'react-bootstrap';
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
    <Row>
      <Col md={target.isChannel ? 10 : 12}>
        <h2>{target.displayName}</h2>
        {target.topic && <h4>{target.topic}</h4>}

        {target.messages.map((message, i) => (
          message.type === 'message' ? <Message key={i} message={message} /> : <Event key={i} event={message} />
        ))}

        <form onSubmit={submit}>
          <input type="text" value={message} onChange={handleChange} />

          <button type="submit">Enviar</button>
        </form>
      </Col>
      {target.isChannel && (
        <Col md={2}>
          <UserList channel={target} />
        </Col>
      )}
    </Row>
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

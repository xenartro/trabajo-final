import { Accordion, Card } from 'react-bootstrap';
import { useWorkspace } from 'components/context/Workspace';

const Sidebar = () => {
  const { workspace, join, setActiveChat, part } = useWorkspace();

  function askAndJoin(e) {
    e.stopPropagation();

    const channel = window.prompt('Nombre del canal');

    if (channel) {
      join(channel);
    }
  }

  return (
    <Accordion defaultActiveKey="0">
      <Card>
        <Accordion.Toggle as={Card.Header} eventKey="0">
          Canales
          <button onClick={askAndJoin}>+</button>
        </Accordion.Toggle>
        <Accordion.Collapse eventKey="0">
          <Card.Body>
            <ul>
              {workspace.channels.map(channel => (
                <li className={workspace.activeChat === channel ? 'font-weight-bold' : ''} onClick={() => setActiveChat(channel)} key={channel.id}>
                  {channel.name}
                  <button onClick={(e) => { e.stopPropagation(); part(channel) }}>x</button>
                </li>
              ))}
              {workspace.conversations.map((conversation, i) => (
                <li className={workspace.activeChat === conversation ? 'font-weight-bold' : ''} onClick={() => setActiveChat(conversation)} key={i}>
                  {conversation.user.nickname}
                  <button onClick={(e) => { e.stopPropagation(); part(conversation) }}>x</button>
                </li>
              ))}
            </ul>
          </Card.Body>
        </Accordion.Collapse>
      </Card>
      <Card>
        <Accordion.Toggle as={Card.Header} eventKey="1">
          Mensajes privados
        </Accordion.Toggle>
        <Accordion.Collapse eventKey="1">
          <Card.Body>
            Matyax (tú)
          </Card.Body>
        </Accordion.Collapse>
      </Card>
    </Accordion>
  );
}

export default Sidebar;

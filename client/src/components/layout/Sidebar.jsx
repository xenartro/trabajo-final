import { Accordion, Card } from 'react-bootstrap';
import { useWorkspace } from 'components/context/Workspace';

const Sidebar = ({ setActiveChat }) => {
  const { workspace, join } = useWorkspace();

  return (
    <Accordion defaultActiveKey="0">
      <Card>
        <Accordion.Toggle as={Card.Header} eventKey="0">
          Canales
          <button onClick={() => join('trabajofinal') }>+</button>
        </Accordion.Toggle>
        <Accordion.Collapse eventKey="0">
          <Card.Body>
            <ul>
              {workspace.channels.map(channel => (
                <li onClick={() => setActiveChat(channel)} key={channel.id}>{channel.name}</li>
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

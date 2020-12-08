import { Accordion, Card } from 'react-bootstrap';
import { useWorkspace } from 'components/context/Workspace';

const Sidebar = ({ setActiveChat }) => {
  const { workspace, join } = useWorkspace();

  return (
    <Accordion>
      <Card>
        <Accordion.Toggle as={Card.Header}>
          Canales
          <button onClick={() => join('trabajofinal') }>+</button>
        </Accordion.Toggle>
        <Accordion.Collapse>
          <Card.Body>
            <ul>
              {workspace.channels.map(channel => (
                <li onClick={() => setActiveChat(channel)}>{channel.name}</li>
              ))}
            </ul>
          </Card.Body>
        </Accordion.Collapse>
      </Card>
      <Card>
        <Accordion.Toggle as={Card.Header}>
          Mensajes privados
        </Accordion.Toggle>
        <Accordion.Collapse>
          <Card.Body>
            Matyax (tú)
          </Card.Body>
        </Accordion.Collapse>
      </Card>
    </Accordion>
  );
}

export default Sidebar;

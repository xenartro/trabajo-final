import { Accordion, Card, Container, Row, Col } from 'react-bootstrap';
import { isConnected } from 'services/connection';
import { Redirect } from 'react-router-dom';
import { send } from 'services/commands';
import { useState } from 'react';

const states = {
  OFFLINE: 0,
  CONNECTED: 1,
}

const ClientLayout = () => {
  const [command, setCommand] = useState('');
  const [state, setState] = useState(isConnected() ? states.CONNECTED : states.OFFLINE);

  function handleChange(e) {
    setCommand(e.currentTarget.value);
  }

  function submit(e) {
    e.preventDefault();

    send(command);

    setCommand('');
  }

  if (state === states.OFFLINE) {
    return <Redirect to="/" />;
  }

  return (
    <Container fluid>
      <Row>
        <Col>Buscar</Col>
      </Row>
      <Row>
        <Col md={2}>
          <Accordion defaultActiveKey="0">
          <Card>
            <Accordion.Toggle as={Card.Header} eventKey="0">
              Canales
            </Accordion.Toggle>
            <Accordion.Collapse eventKey="0">
              <Card.Body>
                # General
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

        </Col>
        <Col>
          Lista de mensajes...
        </Col>
      </Row>
      <Row>
        <Col>
          <form onSubmit={submit}>
            <input type="text" value={command} onChange={handleChange} />

            <button type="submit">Enviar</button>
          </form>
        </Col>
      </Row>
    </Container>
  )
}

export default ClientLayout;

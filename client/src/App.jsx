import { init, send } from 'services/commands';
import { useState, useEffect } from 'react';
import { Accordion, Card, Container, Row, Col } from 'react-bootstrap';

import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  const [command, setCommand] = useState('');

  function handleChange(e) {
    setCommand(e.currentTarget.value);
  }

  function submit(e) {
    e.preventDefault();

    send(command);

    setCommand('');
  }

  useEffect(() => {
    init();
  }, []);

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
  );
}

export default App;

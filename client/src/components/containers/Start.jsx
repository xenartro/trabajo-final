import Layout from 'components/layout/External';
import { Alert, Button, Card, Col, Form, Row, Spinner } from 'react-bootstrap';
import { connect } from 'services/connection';
import { Redirect } from 'react-router-dom';
import { useState } from 'react';
import { useUserContext } from 'components/context/User';

const emptyUser = {
  name: '',
  nickname: ''
};

const states = {
  READY: 1,
  CONNECTING: 2,
  ERROR: 3,
  SUCCESS: 4,
};

const Start = () => {
  const userContext = useUserContext();
  const [user, setUser] = useState(userContext.user || emptyUser);
  const [state, setState] = useState(states.READY);

  function handleChange(e) {
    setUser({ ...user, [e.currentTarget.name]: e.currentTarget.value });
  }

  function handleSubmit(e) {
    e.preventDefault();

    userContext.set(user);

    setState(states.CONNECTING);

    try {
      connect(user, () => {
        setState(states.SUCCESS);
      }, () => {
        setState(states.ERROR);
      });
    } catch (e) {
      console.error(e);

      setState(states.ERROR);
    }
  }

  if (state === states.SUCCESS) {
    return <Redirect to="/chat" />;
  }

  return (
    <Layout>
      <Row>
        <Col md={{ offset: 3, span: 6 }}>
          <Card>
            <Card.Header>Iniciar sesión</Card.Header>
            <Card.Body>
              {state === states.ERROR && <Alert type="danger">Error al conectar.</Alert>}

              <Form onSubmit={handleSubmit}>
                <Form.Group>
                  <Form.Label>Nombre</Form.Label>
                  <Form.Control name="name" placeholder="Ingrese su nombre" value={user.name} onChange={handleChange} required />
                </Form.Group>
                <Form.Group>
                  <Form.Label>Nickname</Form.Label>
                  <Form.Control name="nickname" placeholder="Ingrese su sobrenombre" value={user.nickname} onChange={handleChange} required />
                </Form.Group>
                {state === states.READY && (
                  <Button variant="primary" type="submit">
                    Conectarse
                  </Button>
                )}
                {state === states.CONNECTING && (
                  <Button variant="primary" disabled>
                    <Spinner
                      as="span"
                      animation="grow"
                      size="sm"
                      role="status"
                      aria-hidden="true"
                    />
                    {' '}Conectando...
                  </Button>
                )}
              </Form>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Layout>
  )
}

export default Start;

import Layout from 'components/layout/External';
import { Alert, Button, Card, Col, Form, Row, Spinner } from 'react-bootstrap';
import { connect } from 'services/connection';
import { Redirect } from 'react-router-dom';
import { useState } from 'react';
import { useUserContext } from 'components/context/User';
import Logo from 'images/logo.svg';


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

  async function handleSubmit(e) {
    e.preventDefault();

    userContext.set(user);

    setState(states.CONNECTING);

    try {
      await connect(user);

      setState(states.SUCCESS);
    } catch (e) {
      console.error(e);

      setState(states.ERROR);
    }
  }

  if (state === states.SUCCESS) {
    return <Redirect to="/chat" />;
  }

  return (
    <div className="center-container">
    <Layout>

        <Row>
          <Col md={{ offset: 4, span: 4 }}>
            <img src={Logo} alt=""/>
            <h1 className="h1">¡Hola! 😀</h1>
            <Card bsPrefix="irc-card">

              <Card.Body>
                <h4>Inicia sesión para empezar a chatear.</h4>
                <br/>
                {state === states.ERROR && <Alert type="danger">Error al conectar.</Alert>}

                <Form onSubmit={handleSubmit}>
                  <Form.Group>
                    <Form.Label bsPrefix="irc-label">Nombre</Form.Label>
                    <Form.Control bsPrefix="irc-input" name="name" placeholder="Ingrese su nombre" value={user.name} onChange={handleChange} required />
                  </Form.Group>
                  <Form.Group>
                    <Form.Label bsPrefix="irc-label">Nickname</Form.Label>
                    <Form.Control  bsPrefix="irc-input" name="nickname" placeholder="Ingrese su sobrenombre" value={user.nickname} onChange={handleChange} required />
                  </Form.Group>
                  {state === states.READY && (
                    <Button bsPrefix="irc-button"  type="submit">
                      Conectarse
                    </Button>
                  )}
                  {state === states.CONNECTING && (
                    <Button bsPrefix="irc-button"  disabled>
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
    </div>
  )
}

export default Start;

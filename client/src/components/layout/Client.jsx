import Chat from 'components/chat/Chat';
import Sidebar from './Sidebar';
import WorkspaceContext from 'components/context/Workspace';
import { Container, Row, Col } from 'react-bootstrap';
import { isConnected } from 'services/connection';
import { Redirect } from 'react-router-dom';
import { useState } from 'react';

const states = {
  OFFLINE: 0,
  CONNECTED: 1,
}

const ClientLayout = () => {
  const [state, setState] = useState({
    state: isConnected() ? states.CONNECTED : states.OFFLINE,
    activeChat: null
  });

  if (state.state === states.OFFLINE) {
    return <Redirect to="/" />;
  }

  return (
    <WorkspaceContext>
      <Container fluid>
        <Row>
          <Col>Buscar</Col>
        </Row>
        <Row>
          <Col md={2}>
            <Sidebar setActiveChat={(target) => setState({...state, activeChat: target })} />
          </Col>
          <Col>
            {state.activeChat && <Chat target={state.activeChat} />}
          </Col>
        </Row>
      </Container>
    </WorkspaceContext>
  )
}

export default ClientLayout;

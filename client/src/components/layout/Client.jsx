import Chat from 'components/chat/Chat';
import Sidebar from './Sidebar';
import WorkspaceContext from 'components/context/Workspace';
import { Container, Row, Col } from 'react-bootstrap';
import { isConnected } from 'services/connection';
import { Redirect } from 'react-router-dom';

const ClientLayout = () => {
  if (!isConnected()) {
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
            <Sidebar />
          </Col>
          <Col>
            <Chat />
          </Col>
        </Row>
      </Container>
    </WorkspaceContext>
  )
}

export default ClientLayout;

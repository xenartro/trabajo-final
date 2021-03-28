import Chat from 'components/chat/Chat';
import Sidebar from './Sidebar';
import useConnectionStatus from 'hooks/useConnectionStatus';
import WorkspaceContext from 'components/context/Workspace';
import { Container, Row, Col } from 'react-bootstrap';
import { Redirect } from 'react-router-dom';

const ClientLayout = () => {
  const connected = useConnectionStatus();

  if (!connected) {
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

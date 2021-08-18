import Chat from 'components/chat/Chat';
import Search from 'components/history/Search';
import Sidebar from './Sidebar';
import useConnectionStatus from 'hooks/useConnectionStatus';
import WorkspaceContext from 'components/context/Workspace';
import { Container, Row, Col, Form } from 'react-bootstrap';
import { Redirect } from 'react-router-dom';
import { useState } from 'react';
import { useUserContext } from 'components/context/User';
import Logo from 'images/logo.svg';
import User from 'components/chat/User';

const ClientLayout = () => {
  const connected = useConnectionStatus();
  const { user } = useUserContext();
  const [search, setSearch] = useState('');

  if (!connected) {
    return <Redirect to="/" />;
  }

  function handleSearchChange(e) {
    setSearch(e.currentTarget.value);
  }

  return (
    <WorkspaceContext>
      <Container fluid bsPrefix="no-margin container">
        <div className="irc-header">
          <Row>
            <Col bsPrefix="no-margin col" md={2}><img src={Logo} alt=""/></Col>
            <Col bsPrefix="irc-header__search col">
              <Form>
                  <Form.Control bsPrefix="irc-input irc-input--search" onChange={handleSearchChange} value={search} placeholder="Buscar"  />
              </Form>
            </Col>
            <Col bsPrefix="no-margin irc-header__user col"md={2}><User color="1" right user={user.nickname}/></Col>
          </Row>
        </div>
        <Row>
          <Col bsPrefix="no-margin col" md={2}>
            <Sidebar />
          </Col>
          <Col bsPrefix="no-margin col">
            {!search && <Chat />}
            {search && <Search text={search} />}
          </Col>
        </Row>
      </Container>
    </WorkspaceContext>
  )
}

export default ClientLayout;

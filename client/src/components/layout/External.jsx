import { Container, Row, Col } from 'react-bootstrap';

const ExternalLayout = ({ children }) => {
  return (
    <Container fluid>
      <Row>
        <Col>{ children }</Col>
      </Row>
    </Container>
  )
}

export default ExternalLayout;

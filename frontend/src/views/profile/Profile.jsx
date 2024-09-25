import React from 'react';
import { Row, Col, Card, Table } from 'react-bootstrap';

const Profile = () => {
  return (
    <React.Fragment>
      <Row>
        <Col>
          <Card>
            <Card.Header>
              <Card.Title as="h5">Perfil</Card.Title>
            </Card.Header>
            <Card.Body>
              <Table responsive hover>
                <thead>
                  <tr>
                    <th>Nombre</th>
                    <th>Apellido</th>                    
                    <th>Correo electrónico</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>Martín</td>
                    <td>Gómez</td>
                    <td>mgomez@gmail.com</td>
                  </tr>
                </tbody>
              </Table>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </React.Fragment>
  );
};

export default Profile;

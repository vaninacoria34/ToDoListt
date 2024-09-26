import React from 'react';
import { Row, Col, Card, Table, Button } from 'react-bootstrap';

const ListadoCategoria = () => {
  return (
    <React.Fragment>
      <Row>
        <Col>
          <Card>
            <Card.Header>
              <Card.Title as="h5">Listado de categorías</Card.Title>
            </Card.Header>
            <Card.Body>
              <Table responsive hover>
                <thead>
                  <tr>
                    <th>#</th>
                    <th>Nombre</th>
                    <th>Acciones</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <th scope="row">1</th>
                    <td>Mark</td>
                    <td>
                      {/* <Link to={`/tareas/edit/${tarea.id}`}> */}
                        <Button variant="primary">Editar</Button>
                      {/* </Link> */}
                        <Button variant="danger">Eliminar</Button>
                    </td>
                  </tr>
                  <tr>
                    <th scope="row">2</th>
                    <td>Jacob</td>
                    <td>
                      {/* <Link to={`/tareas/edit/${tarea.id}`}> */}
                        <Button variant="primary">Editar</Button>
                      {/* </Link> */}
                        <Button variant="danger">Eliminar</Button>
                    </td>
                  </tr>
                  <tr>
                    <th scope="row">3</th>
                    <td>Larry</td>
                    <td>
                      {/* <Link to={`/tareas/edit/${tarea.id}`}> */}
                        <Button variant="primary">Editar</Button>
                      {/* </Link> */}
                        <Button variant="danger">Eliminar</Button>
                    </td>
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

export default ListadoCategoria;

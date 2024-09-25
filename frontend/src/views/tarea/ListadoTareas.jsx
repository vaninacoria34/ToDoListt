import React, { useState } from 'react';
import { Row, Col, Button, Card, Collapse, Table } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const TareasCollapse = () => {
  const [isBasic, setIsBasic] = useState(false);
  const [isMultiTarget, setIsMultiTarget] = useState([]);
  const [accordionKey, setAccordionKey] = useState(1);

  const targetHandler = (target) => {
    if (isMultiTarget.findIndex((item) => item === target) > -1) {
      setIsMultiTarget((prevState) => {
        return prevState.filter((item) => item !== target);
      });
    } else {
      setIsMultiTarget((prevState) => {
        return [...prevState, target];
      });
    }
  };

  const multiTargetHandler = () => {
    const allTarget = ['target1', 'target2'];
    allTarget.map((target) => targetHandler(target));
  };

  return (
    <React.Fragment>
      <Row className="btn-page">
        <Col sm={12} className="accordion">
          <h5>Listado de tareas</h5>
          <hr />
          <Card className="mt-2">
            <Card.Header>
              <Card.Title as="h5">
                <Link
                  to="#"
                  onClick={() => setAccordionKey(accordionKey !== 1 ? 1 : 0)}
                  aria-controls="accordion1"
                  aria-expanded={accordionKey === 1}
                >
                  Título Tarea #1: Hacer T.P.
                </Link>
              </Card.Title>
            </Card.Header>
            <Collapse in={accordionKey === 1}>
              <div id="accordion1">
                <Card.Body>
                  <Card.Text>
                    Descripción: Anim pariatur cliche reprehenderit, enim eiusmod high life accusamus terry richardson ad squid. 3 wolf moon officia
                    aute, non cupidatat skateboard dolor brunch. Food truck quinoa nesciunt laborum eiusmod. Brunch 3 wolf moon tempor, sunt
                    aliqua put a bird on it squid single-origin coffee nulla assumenda shoreditch et. Nihil anim keffiyeh helvetica, craft
                    beer labore wes anderson cred nesciunt sapiente ea proident. Ad vegan excepteur butcher vice lomo. Leggings occaecat
                    craft beer farm-to-table, raw denim aesthetic synth nesciunt you probably haven&apos;t heard of them accusamus labore
                    sustainable VHS.
                  </Card.Text>
                  <Row>
                    <Col>
                      <Card>
                        <Card.Body>
                          <Table responsive hover>
                            <thead>
                              <tr>
                                <th>Fecha creación</th>
                                <th>Fecha límite</th>
                                <th>Estado</th>
                                <th>Prioridad</th>
                                <th>Categoría</th>
                                <th>Acciones</th>
                              </tr>
                            </thead>
                            <tbody>
                              <tr>
                                <th scope="row">18/09/2024</th>
                                <td>25/09/2024</td>
                                <td>En proceso</td>
                                <td>Alta</td>
                                <td>Estudio</td>
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
                </Card.Body>
              </div>
            </Collapse>
          </Card>
          <Card className="mt-2">
            <Card.Header>
              <Card.Title as="h5">
                <Link
                  to="#"
                  onClick={() => setAccordionKey(accordionKey !== 2 ? 2 : 0)}
                  aria-controls="accordion2"
                  aria-expanded={accordionKey === 2}
                >
                  Título Tarea #2: Ir al gimnasio
                </Link>
              </Card.Title>
            </Card.Header>
            <Collapse in={accordionKey === 2}>
              <div id="accordion2">
                <Card.Body>
                  <Card.Text>
                    Descripción: Anim pariatur cliche reprehenderit, enim eiusmod high life accusamus terry richardson ad squid. 3 wolf moon officia
                    aute, non cupidatat skateboard dolor brunch. Food truck quinoa nesciunt laborum eiusmod. Brunch 3 wolf moon tempor, sunt
                    aliqua put a bird on it squid single-origin coffee nulla assumenda shoreditch et. Nihil anim keffiyeh helvetica, craft
                    beer labore wes anderson cred nesciunt sapiente ea proident. Ad vegan excepteur butcher vice lomo. Leggings occaecat
                    craft beer farm-to-table, raw denim aesthetic synth nesciunt you probably haven&apos;t heard of them accusamus labore
                    sustainable VHS.
                  </Card.Text>
                  <Row>
                    <Col>
                      <Card>
                        <Card.Body>
                          <Table responsive hover>
                            <thead>
                              <tr>
                                <th>Fecha creación</th>
                                <th>Fecha límite</th>
                                <th>Estado</th>
                                <th>Prioridad</th>
                                <th>Categoría</th>
                                <th>Acciones</th>
                              </tr>
                            </thead>
                            <tbody>
                              <tr>
                                <th scope="row">18/09/2024</th>
                                <td>25/09/2024</td>
                                <td>En proceso</td>
                                <td>Alta</td>
                                <td>Estudio</td>
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
                </Card.Body>
              </div>
            </Collapse>
          </Card>
          <Card className="mt-2">
            <Card.Header>
              <Card.Title as="h5">
                <Link
                  to="#"
                  onClick={() => setAccordionKey(accordionKey !== 3 ? 3 : 0)}
                  aria-controls="accordion3"
                  aria-expanded={accordionKey === 3}
                >
                  Título Tarea #3: Pagar la luz
                </Link>
              </Card.Title>
            </Card.Header>
            <Collapse in={accordionKey === 3}>
              <div id="accordion3">
                <Card.Body>
                  <Card.Text>
                    Descripción: Anim pariatur cliche reprehenderit, enim eiusmod high life accusamus terry richardson ad squid. 3 wolf moon officia
                    aute, non cupidatat skateboard dolor brunch. Food truck quinoa nesciunt laborum eiusmod. Brunch 3 wolf moon tempor, sunt
                    aliqua put a bird on it squid single-origin coffee nulla assumenda shoreditch et. Nihil anim keffiyeh helvetica, craft
                    beer labore wes anderson cred nesciunt sapiente ea proident. Ad vegan excepteur butcher vice lomo. Leggings occaecat
                    craft beer farm-to-table, raw denim aesthetic synth nesciunt you probably haven&apos;t heard of them accusamus labore
                    sustainable VHS.
                  </Card.Text>
                  <Row>
                    <Col>
                      <Card>
                        <Card.Body>
                          <Table responsive hover>
                            <thead>
                              <tr>
                                <th>Fecha creación</th>
                                <th>Fecha límite</th>
                                <th>Estado</th>
                                <th>Prioridad</th>
                                <th>Categoría</th>
                                <th>Acciones</th>
                              </tr>
                            </thead>
                            <tbody>
                              <tr>
                                <th scope="row">18/09/2024</th>
                                <td>25/09/2024</td>
                                <td>En proceso</td>
                                <td>Alta</td>
                                <td>Estudio</td>
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
                </Card.Body>
              </div>
            </Collapse>
          </Card>
        </Col>
      </Row>
    </React.Fragment>
  );
};

export default TareasCollapse;

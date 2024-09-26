import React, { useEffect, useState } from "react";
import { Row, Col, Card, Table, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import axios from "axios";

const ListadoEstado = () => {
  const [estados, setEstados] = useState([]);

  useEffect(() => {
    // Llamada a la API para obtener los estados
    const fetchEstados = async () => {
      try {
        const response = await axios.get("http://localhost:3001/estado");
        setEstados(response.data);
      } catch (error) {
        console.error("Error al obtener los estados:", error);
      }
    };

    fetchEstados();
  }, []);

  return (
    <React.Fragment>
      <Row>
        <Col>
          <Card>
            <Card.Header>
              <Card.Title as="h5">Listado de estados</Card.Title>
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
                  {estados.map((estado) => (
                    <tr>
                      <th scope="row">{estado.PK_Estado}</th>
                      <td>{estado.nombre}</td>
                      <td>
                        <Link to={`/estado/edit/${estado.PK_Estado}`}>
                          <Button variant="primary">Editar</Button>
                        </Link>
                        <Link to={`/estado/delete/${estado.PK_Estado}`}>
                          <Button variant="danger">Eliminar</Button>
                        </Link>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </React.Fragment>
  );
};

export default ListadoEstado;

import React, { useState } from 'react';
import { Row, Col, Card, Form, Button } from 'react-bootstrap';

const AddCategoria = () => {
  // Estado para manejar el valor del campo y los errores
  const [nombre, setNombre] = useState('');
  const [error, setError] = useState('');

  // Expresión regular para validar solo letras y espacios
  const soloLetrasRegex = /^[a-zA-Z\s]+$/;

  // Función de validación
  const handleSubmit = (e) => {
    e.preventDefault();

    // Verificar si el campo está vacío
    if (nombre.trim() === '') {
      setError('El nombre de la categoría no puede estar vacío.');
      return;
    }

    // Verificar si contiene solo letras y espacios
    if (!soloLetrasRegex.test(nombre)) {
      setError('El nombre de la categoría sólo puede contener letras.');
      return;
    }

    // Si todo está bien, limpiar el error y continuar
    setError('');
    console.log('Categoría agregada:', nombre);
    // Aquí puedes manejar el envío de los datos, por ejemplo, a una API
  };

  return (
    <React.Fragment>
      <Col sm={12}>
        <Card>
          <Card.Header>
            <Card.Title as="h5">Agregar Categoría</Card.Title>
          </Card.Header>
          <Card.Body>
            <Row>
              <Col sm={12} style={{ overflowX: 'auto' }}>
                <Form className="d-inline-flex" onSubmit={handleSubmit}>
                  <Form.Group className="d-inline-flex mr-5 mx-3 align-items-center">
                    <Form.Label className="mb-0">Nombre </Form.Label>
                    <Form.Control
                      className="mx-4"
                      type="text"
                      placeholder="Nombre de la categoría"
                      value={nombre}
                      onChange={(e) => setNombre(e.target.value)}
                    />
                  </Form.Group>
                  <Form.Group className="d-inline-flex mx-3" style={{ overflow: 'unset' }}>
                    <Button type="submit" className="mb-0">Agregar Categoría</Button>
                  </Form.Group>
                </Form>

                {/* Mostrar mensaje de error si hay algún problema */}
                {error && <p style={{ color: 'red' }}>{error}</p>}
              </Col>
            </Row>
          </Card.Body>
        </Card>
      </Col>
    </React.Fragment>
  );
};

export default AddCategoria;

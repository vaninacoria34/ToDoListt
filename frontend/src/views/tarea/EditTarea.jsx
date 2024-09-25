import React, { useState } from 'react';
import { Row, Col, Card, Form, Button } from 'react-bootstrap';

const EditTarea = () => {
  // Estado para manejar los datos del formulario
  const [formData, setFormData] = useState({
    titulo: '',
    descripcion: '',
    fechaVencimiento: '',
    prioridad: '',
    estado: '',
    categoria: '',
  });

  // Estado para manejar errores
  const [errors, setErrors] = useState({});

  // Manejar cambios en el formulario
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
    setErrors({ ...errors, [name]: '' }); // Limpiar error al cambiar el campo
  };

  // Manejar el envío del formulario
  const handleSubmit = (e) => {
    e.preventDefault();
    const newErrors = {};

    // Verificar campos vacíos
    for (const field in formData) {
      if (!formData[field]) {
        newErrors[field] = 'Este campo es obligatorio';
      }
    }

    // Validar que la fecha de vencimiento sea posterior a la fecha actual
    const today = new Date();
    const fechaVencimiento = new Date(formData.fechaVencimiento);
    if (fechaVencimiento <= today) {
      newErrors.fechaVencimiento = 'La fecha de vencimiento debe ser posterior a la fecha actual';
    }

    // Si hay errores, establecerlos en el estado
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    // Aquí puedes manejar el envío de los datos, como enviarlos a una API
    console.log(formData);
  };

  return (
    <React.Fragment>
      <Row>
        <Col sm={12}>
          <Card>
            <Card.Header>
              <Card.Title as="h5">Editar Tarea</Card.Title>
            </Card.Header>
            <Card.Body>
              <Form onSubmit={handleSubmit}>
                <Form.Group className="mb-3" controlId="titulo">
                  <Form.Label>Título</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Título tarea"
                    name="titulo"
                    value={formData.titulo}
                    onChange={handleChange}
                    isInvalid={!!errors.titulo}
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors.titulo}
                  </Form.Control.Feedback>
                </Form.Group>
                <Form.Group className="mb-3" controlId="descripcion">
                  <Form.Label>Descripción</Form.Label>
                  <Form.Control
                    as="textarea"
                    rows="3"
                    name="descripcion"
                    value={formData.descripcion}
                    onChange={handleChange}
                    isInvalid={!!errors.descripcion}
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors.descripcion}
                  </Form.Control.Feedback>
                </Form.Group>
                <Row>
                  <Col md={6}>
                    <Form.Group className="mb-3" controlId="fechaVencimiento">
                      <Form.Label>Fecha de vencimiento</Form.Label>
                      <Form.Control
                        type="date"
                        name="fechaVencimiento"
                        value={formData.fechaVencimiento}
                        onChange={handleChange}
                        isInvalid={!!errors.fechaVencimiento}
                      />
                      <Form.Control.Feedback type="invalid">
                        {errors.fechaVencimiento}
                      </Form.Control.Feedback>
                    </Form.Group>
                  </Col>
                  <Col md={6}>
                    <Form.Group className="mb-3" controlId="prioridad">
                      <Form.Label>Prioridad</Form.Label>
                      <Form.Control
                        as="select"
                        name="prioridad"
                        value={formData.prioridad}
                        onChange={handleChange}
                        isInvalid={!!errors.prioridad}
                      >
                        <option value="">Selecciona una prioridad</option>
                        <option value="1">1</option>
                        <option value="2">2</option>
                        <option value="3">3</option>
                        <option value="4">4</option>
                        <option value="5">5</option>
                      </Form.Control>
                      <Form.Control.Feedback type="invalid">
                        {errors.prioridad}
                      </Form.Control.Feedback>
                    </Form.Group>
                  </Col>
                </Row>
                <Row>
                  <Col md={6}>
                    <Form.Group className="mb-3" controlId="estado">
                      <Form.Label>Estado</Form.Label>
                      <Form.Control
                        as="select"
                        name="estado"
                        value={formData.estado}
                        onChange={handleChange}
                        isInvalid={!!errors.estado}
                      >
                        <option value="">Selecciona un estado</option>
                        <option value="1">1</option>
                        <option value="2">2</option>
                        <option value="3">3</option>
                        <option value="4">4</option>
                        <option value="5">5</option>
                      </Form.Control>
                      <Form.Control.Feedback type="invalid">
                        {errors.estado}
                      </Form.Control.Feedback>
                    </Form.Group>
                  </Col>
                  <Col md={6}>
                    <Form.Group className="mb-3" controlId="categoria">
                      <Form.Label>Categoría</Form.Label>
                      <Form.Control
                        as="select"
                        name="categoria"
                        value={formData.categoria}
                        onChange={handleChange}
                        isInvalid={!!errors.categoria}
                      >
                        <option value="">Selecciona una categoría</option>
                        <option value="1">1</option>
                        <option value="2">2</option>
                        <option value="3">3</option>
                        <option value="4">4</option>
                        <option value="5">5</option>
                      </Form.Control>
                      <Form.Control.Feedback type="invalid">
                        {errors.categoria}
                      </Form.Control.Feedback>
                    </Form.Group>
                  </Col>
                </Row>
                <div className="d-flex justify-content-center mt-3">
                  <Button variant="success" type="submit">Guardar Tarea</Button>
                </div>
              </Form>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </React.Fragment>
  );
};

export default EditTarea;

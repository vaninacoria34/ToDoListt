import React from 'react';
import { Card, Row, Col } from 'react-bootstrap';
import { NavLink, Link } from 'react-router-dom';

import Breadcrumb from '../../../layouts/AdminLayout/Breadcrumb';

const SignUp1 = () => {
  return (
    <React.Fragment>
      <Breadcrumb />
      <div className="auth-wrapper">
        <div className="auth-content">
          <div className="auth-bg">
            <span className="r" />
            <span className="r s" />
            <span className="r s" />
            <span className="r" />
          </div>
          <Card className="borderless">
            <Row className="align-items-center">
              <Col>
                <Card.Body className="text-center">
                  <div className="mb-4">
                    <i className="feather icon-user-plus auth-icon" />
                  </div>
                  <h3 className="mb-4">Registro</h3>
                  <div className="input-group mb-3">
                    <input type="text" className="form-control" placeholder="Nombre" />
                  </div>
                  <div className="input-group mb-3">
                    <input type="text" className="form-control" placeholder="Apellido" />
                  </div>
                  <div className="input-group mb-3">
                    <input type="email" className="form-control" placeholder="Correo electrónico" />
                  </div>
                  <div className="input-group mb-4">
                    <input type="password" className="form-control" placeholder="Contraseña" />
                  </div>
                  <button className="btn btn-primary mb-4">Registrarse</button>
                  <p className="mb-2">
                    ¿Ya tienes una cuenta?{' '}
                    <NavLink to={'/auth/signin-1'} className="f-w-400">
                      Inicia sesión
                    </NavLink>
                  </p>
                </Card.Body>
              </Col>
            </Row>
          </Card>
        </div>
      </div>
    </React.Fragment>
  );
};

export default SignUp1;

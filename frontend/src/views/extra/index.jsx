import React from 'react';
import { Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const Index = () => {
  return (
    <React.Fragment>
      <div className="auth-wrapper">
        <div className="auth-content">
          <div className="auth-bg">
            <span className="r" />
            <span className="r s" />
            <span className="r s" />
            <span className="r" />
          </div>
          <Card className="borderless text-center">
            <Card.Body>
              <h3 className="mb-4">Bienvenido a tu Agenda</h3>
              <p>Organiza tus tareas y mantente al día con nuestra agenda digital.</p>
              <div className="mb-2">
                <Link to="/auth/signin" className="label theme-bg2 text-white h6 mx-2">Iniciar sesión</Link>
                <Link to="/auth/signup" className="label theme-bg text-white h6 mx-2">Registrarse</Link>
              </div>
            </Card.Body>
          </Card>
        </div>
      </div>
    </React.Fragment>
  );
};

export default Index;

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
              <h3 className="mb-4">Bienvenido a tu agenda Martín!!</h3>
            </Card.Body>
          </Card>
        </div>
      </div>
    </React.Fragment>
  );
};

export default Index;

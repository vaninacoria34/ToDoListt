import React from 'react';

function RegistroPage() {
  return (
    <div className="container">
      <h1>Registrarse</h1>
      <form>
        <div className="mb-3">
          <label className="form-label">Nombre de Usuario</label>
          <input type="text" className="form-control" />
        </div>
        <div className="mb-3">
          <label className="form-label">Email</label>
          <input type="email" className="form-control" />
        </div>
        <div className="mb-3">
          <label className="form-label">Contraseña</label>
          <input type="password" className="form-control" />
        </div>
        <button type="submit" className="btn btn-primary">Registrarse</button>
      </form>
    </div>
  );
}

export default RegistroPage;

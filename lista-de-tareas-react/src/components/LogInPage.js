import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Importa useNavigate

function LogInPage({ setUser }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const navigate = useNavigate(); // Inicializa useNavigate

  const handleSubmit = async (e) => {
    e.preventDefault(); // Evitar que la página se recargue al enviar el formulario

    try {
      const response = await fetch('http://localhost:3001/usuario/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      if (!response.ok) {
        throw new Error('Error en la respuesta del servidor');
      }

      const data = await response.json();

      // Si el inicio de sesión es exitoso, guarda el token y redirige
      localStorage.setItem('token', data.token);
      setSuccessMessage('Inicio de sesión exitoso!');
      setUser({ 
        nombre: data.nombre, // Cambia según la respuesta
        apellido: data.apellido // Cambia según la respuesta
      });
      
      // Almacenar también los datos del usuario en localStorage
      localStorage.setItem('user', JSON.stringify({
        userName: data.userName, // Cambia según la respuesta
        userSurname: data.userSurname, // Cambia según la respuesta
        userId: data.userId // Agregar el ID del usuario si lo necesitas
      }));
      
      setError(''); // Limpiar cualquier mensaje de error

      // Redirigir a la página de tareas con el ID del usuario
      navigate(`/tareas?userId=${data.userId}`);
    } catch (error) {
      setError(error.message || 'Error al iniciar sesión');
      setSuccessMessage(''); // Limpiar el mensaje de éxito
    }
  };

  return (
    <div className="container">
      <h1>Inicio de sesión</h1>
      {error && <div className="alert alert-danger">{error}</div>}
      {successMessage && <div className="alert alert-success">{successMessage}</div>}
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label className="form-label">Email</label>
          <input
            type="email"
            className="form-control"
            value={email}
            onChange={(e) => setEmail(e.target.value)} // Actualiza el estado del email
            required
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Contraseña</label>
          <input
            type="password"
            className="form-control"
            value={password}
            onChange={(e) => setPassword(e.target.value)} // Actualiza el estado de la contraseña
            required
          />
        </div>
        <button type="submit" className="btn btn-primary">Ingresar</button>
      </form>
    </div>
  );
}

export default LogInPage;

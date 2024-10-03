import React, { useState } from 'react';

function RegistroPage() {
  // Estado para almacenar los valores del formulario
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: ''
  });

  // Estado para almacenar los errores de validación
  const [errors, setErrors] = useState({});

  // Manejar el cambio de los valores del formulario
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  // Función de validación del formulario
  const validateForm = () => {
    const newErrors = {};

    // Validación del nombre de usuario
    if (!formData.username.trim()) {
      newErrors.username = 'El nombre de usuario es obligatorio';
    }

    // Validación del email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email.trim()) {
      newErrors.email = 'El email es obligatorio';
    } else if (!emailRegex.test(formData.email)) {
      newErrors.email = 'El formato del email es inválido';
    }

    // Validación de la contraseña
    if (!formData.password.trim()) {
      newErrors.password = 'La contraseña es obligatoria';
    } else if (formData.password.length < 6) {
      newErrors.password = 'La contraseña debe tener al menos 6 caracteres';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Manejar el envío del formulario
  const handleSubmit = (e) => {
    e.preventDefault(); // Evitar la recarga de la página
    if (validateForm()) {
      alert('Formulario enviado exitosamente');
      // Aquí puedes enviar los datos al servidor si es necesario
      console.log(formData);
    }
  };

  return (
    <div className="container mt-5">
      <h1>Registrarse</h1>
      <form onSubmit={handleSubmit}>
        {/* Campo de nombre de usuario */}
        <div className="mb-3">
          <label className="form-label">Nombre de Usuario</label>
          <input
            type="text"
            className={`form-control ${errors.username ? 'is-invalid' : ''}`}
            name="username"
            value={formData.username}
            onChange={handleInputChange}
          />
          {errors.username && <div className="invalid-feedback">{errors.username}</div>}
        </div>

        {/* Campo de email */}
        <div className="mb-3">
          <label className="form-label">Email</label>
          <input
            type="email"
            className={`form-control ${errors.email ? 'is-invalid' : ''}`}
            name="email"
            value={formData.email}
            onChange={handleInputChange}
          />
          {errors.email && <div className="invalid-feedback">{errors.email}</div>}
        </div>

        {/* Campo de contraseña */}
        <div className="mb-3">
          <label className="form-label">Contraseña</label>
          <input
            type="password"
            className={`form-control ${errors.password ? 'is-invalid' : ''}`}
            name="password"
            value={formData.password}
            onChange={handleInputChange}
          />
          {errors.password && <div className="invalid-feedback">{errors.password}</div>}
        </div>

        {/* Botón de envío */}
        <button type="submit" className="btn btn-primary">Registrarse</button>
      </form>
    </div>
  );
}

export default RegistroPage;

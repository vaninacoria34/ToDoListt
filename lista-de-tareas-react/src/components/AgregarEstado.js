import React, { useEffect, useState } from 'react';

function AgregarEstado() {
  const [nuevoEstado, setNuevoEstado] = useState('');
  const [estados, setEstados] = useState([]);

  // Función para obtener estados desde el backend
  const obtenerEstados = async () => {
    try {
      const response = await fetch('http://localhost:3001/estado');
      const data = await response.json();
      setEstados(data);
    } catch (error) {
      console.error('Error al obtener estados:', error);
    }
  };

  // Función para agregar un nuevo estado
  const agregarEstado = async (nombre) => {
    try {
      const response = await fetch('http://localhost:3001/estado/add', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ nombre }),
      });
      const data = await response.json();
      console.log(data.message); // Mensaje de éxito o error
      obtenerEstados(); // Actualizar la lista de estados
    } catch (error) {
      console.error('Error al agregar estado:', error);
    }
  };

  // Función para eliminar un estado
  const eliminarEstado = async (id) => {
    try {
      const response = await fetch(`http://localhost:3001/estado/delete/${id}`, {
        method: 'DELETE',
      });
      const data = await response.json();
      console.log(data.message); // Mensaje de éxito o error
      obtenerEstados(); // Actualizar la lista de estados
    } catch (error) {
      console.error('Error al eliminar estado:', error);
    }
  };

  const manejarCambio = (e) => {
    setNuevoEstado(e.target.value);
  };

  const manejarSubmit = (e) => {
    e.preventDefault();
    if (nuevoEstado.trim()) {
      agregarEstado(nuevoEstado);
      setNuevoEstado(''); // Limpiar el input después de agregar
    }
  };

  useEffect(() => {
    obtenerEstados(); // Obtener estados al cargar el componente
  }, []);

  return (
    <div>
      <h3>Agregar Estado</h3>
      <form onSubmit={manejarSubmit}>
        <input
          type="text"
          value={nuevoEstado}
          onChange={manejarCambio}
          placeholder="Nuevo Estado"
        />
        <button type="submit">Agregar</button>
      </form>

      <h3>Estados</h3>
      <ul>
        {estados.map((estado) => (
          <li key={estado.PK_Estado} className="list-group-item d-flex justify-content-between align-items-center">
            {estado.nombre}
            <i 
              className="bi bi-trash text-danger"
              style={{ cursor: 'pointer' }}
              onClick={() => eliminarEstado(estado.PK_Estado)} // Usar el ID de la categoría
            ></i>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default AgregarEstado;

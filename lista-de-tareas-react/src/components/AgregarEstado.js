import React, { useEffect, useState } from 'react';

function AgregarEstado() {
  const [nuevoEstado, setNuevoEstado] = useState('');
  const [estados, setEstados] = useState([]);
  const [estadoEditando, setEstadoEditando] = useState(null); // Estado para manejar la categoría en edición

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

  // Función para editar un estado
  const editarEstado = async (id, nombre) => {
    try {
      const response = await fetch(`http://localhost:3001/estado/edit/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ nombre }),
      });
      const data = await response.json();
      console.log(data.message); // Mensaje de éxito o error
      obtenerEstados(); // Actualizar la lista de categorías
      cancelarEdicion(); // Reiniciar el estado de edición
    } catch (error) {
      console.error('Error al editar categoría:', error);
    }
  };

  // Función para cancelar la edición
  const cancelarEdicion = () => {
    setEstadoEditando(null); // Restablecer el estado de edición
    setNuevoEstado(''); // Limpiar el campo de entrada
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
      if (estadoEditando) {
        editarEstado(estadoEditando.PK_Estado, nuevoEstado);
      } else {
        agregarEstado(nuevoEstado);
      }
        setNuevoEstado(''); // Limpiar el input
    }
  };

  const iniciarEdicion = (estado) => {
    setEstadoEditando(estado);
    setNuevoEstado(estado.nombre); // Prellena el campo con el nombre del estado
  };

  useEffect(() => {
    obtenerEstados(); // Obtener estados al cargar el componente
  }, []);

  return (
    <div>
      <h3>{estadoEditando ? 'Editar Estado' : 'Agregar Estado'}</h3>
      <form onSubmit={manejarSubmit}>
        <input
          type="text"
          value={nuevoEstado}
          onChange={manejarCambio}
          placeholder={estadoEditando ? 'Editar Estado' : 'Nueva Estado'}
        />
        <button type="submit">{estadoEditando ? 'Actualizar' : 'Agregar'}</button>
        {estadoEditando && (
          <button type="button" onClick={cancelarEdicion} className="btn btn-secondary">
            Cancelar
          </button>
        )}
      </form>

      <h3>Estados</h3>
      <ul>
        {estados.map((estado) => (
          <li key={estado.PK_Estado} className="list-group-item d-flex justify-content-between align-items-center">
            {estado.nombre}
            <div>
            <i
                className="bi bi-pencil text-warning me-2"
                style={{ cursor: 'pointer' }}
                onClick={() => iniciarEdicion(estado)} // Inicia la edición de la categoría
              ></i>
              <i 
                className="bi bi-trash text-danger"
                style={{ cursor: 'pointer' }}
                onClick={() => eliminarEstado(estado.PK_Estado)} // Usar el ID de la categoría
              ></i>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default AgregarEstado;

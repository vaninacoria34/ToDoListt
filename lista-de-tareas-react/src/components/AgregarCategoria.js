import React, { useEffect, useState } from 'react';

function AgregarCategoria() {
  const [nuevaCategoria, setNuevaCategoria] = useState('');
  const [categorias, setCategorias] = useState([]);

  // Función para obtener categorías desde el backend
  const obtenerCategorias = async () => {
    try {
      const response = await fetch('http://localhost:3001/categoria');
      const data = await response.json();
      setCategorias(data);
    } catch (error) {
      console.error('Error al obtener categorías:', error);
    }
  };

  // Función para agregar una nueva categoría
  const agregarCategoria = async (nombre) => {
    try {
      const response = await fetch('http://localhost:3001/categoria/add', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ nombre }),
      });
      const data = await response.json();
      console.log(data.message); // Mensaje de éxito o error
      obtenerCategorias(); // Actualizar la lista de categorías
    } catch (error) {
      console.error('Error al agregar categoría:', error);
    }
  };

  // Función para eliminar una categoría
  const eliminarCategoria = async (id) => {
    try {
      const response = await fetch(`http://localhost:3001/categoria/delete/${id}`, {
        method: 'DELETE',
      });
      const data = await response.json();
      console.log(data.message); // Mensaje de éxito o error
      obtenerCategorias(); // Actualizar la lista de categorías
    } catch (error) {
      console.error('Error al eliminar categoría:', error);
    }
  };

  const manejarCambio = (e) => {
    setNuevaCategoria(e.target.value);
  };

  const manejarSubmit = (e) => {
    e.preventDefault();
    if (nuevaCategoria.trim()) {
      agregarCategoria(nuevaCategoria);
      setNuevaCategoria('');
    }
  };

  useEffect(() => {
    obtenerCategorias(); // Obtener categorías al cargar el componente
  }, []);

  return (
    <div>
      <h3>Agregar Categoría</h3>
      <form onSubmit={manejarSubmit}>
        <input
          type="text"
          value={nuevaCategoria}
          onChange={manejarCambio}
          placeholder="Nueva Categoría"
        />
        <button type="submit">Agregar</button>
      </form>

      <h3>Categorías</h3>
      <ul>
        {categorias.map((categoria) => (
          <li key={categoria.PK_Categoria} className="list-group-item d-flex justify-content-between align-items-center">
            {categoria.nombre}
            <i
              className="bi bi-trash text-danger"
              style={{ cursor: 'pointer' }}
              onClick={() => eliminarCategoria(categoria.PK_Categoria)} // Usar el ID de la categoría
            ></i>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default AgregarCategoria;

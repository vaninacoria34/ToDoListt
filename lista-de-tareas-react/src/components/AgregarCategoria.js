import React, { useEffect, useState } from 'react';

function AgregarCategoria() {
  const [nuevaCategoria, setNuevaCategoria] = useState('');
  const [categorias, setCategorias] = useState([]);
  const [categoriaEditando, setCategoriaEditando] = useState(null); // Estado para manejar la categoría en edición

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

  // Función para editar una categoría
  const editarCategoria = async (id, nombre) => {
    try {
      const response = await fetch(`http://localhost:3001/categoria/update/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ nombre }),
      });
      const data = await response.json();
      console.log(data.message); // Mensaje de éxito o error
      obtenerCategorias(); // Actualizar la lista de categorías
      cancelarEdicion(); // Reiniciar el estado de edición
    } catch (error) {
      console.error('Error al editar categoría:', error);
    }
  };

  // Función para cancelar la edición
  const cancelarEdicion = () => {
    setCategoriaEditando(null); // Restablecer el estado de edición
    setNuevaCategoria(''); // Limpiar el campo de entrada
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
      if (categoriaEditando) {
        editarCategoria(categoriaEditando.PK_Categoria, nuevaCategoria);
      } else {
        agregarCategoria(nuevaCategoria);
      }
      setNuevaCategoria(''); // Reiniciar el campo de entrada
    }
  };

  const iniciarEdicion = (categoria) => {
    setCategoriaEditando(categoria);
    setNuevaCategoria(categoria.nombre); // Prellena el campo con el nombre de la categoría
  };

  useEffect(() => {
    obtenerCategorias(); // Obtener categorías al cargar el componente
  }, []);

  return (
    <div>
      <h3>{categoriaEditando ? 'Editar Categoría' : 'Agregar Categoría'}</h3>
      <form onSubmit={manejarSubmit}>
        <input
          type="text"
          value={nuevaCategoria}
          onChange={manejarCambio}
          placeholder={categoriaEditando ? 'Editar Categoría' : 'Nueva Categoría'}
        />
        <button type="submit">{categoriaEditando ? 'Actualizar' : 'Agregar'}</button>
        {categoriaEditando && (
          <button type="button" onClick={cancelarEdicion} className="btn btn-secondary">
            Cancelar
          </button>
        )}
      </form>

      <h3>Categorías</h3>
      <ul>
        {categorias.map((categoria) => (
          <li key={categoria.PK_Categoria} className="list-group-item d-flex justify-content-between align-items-center">
            {categoria.nombre}
            <div>
              <i
                className="bi bi-pencil text-warning me-2"
                style={{ cursor: 'pointer' }}
                onClick={() => iniciarEdicion(categoria)} // Inicia la edición de la categoría
              ></i>
              <i
                className="bi bi-trash text-danger"
                style={{ cursor: 'pointer' }}
                onClick={() => eliminarCategoria(categoria.PK_Categoria)} // Usar el ID de la categoría
              ></i>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default AgregarCategoria;

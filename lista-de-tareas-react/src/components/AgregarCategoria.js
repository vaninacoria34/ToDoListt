import React, { useState } from 'react';

// Definimos un componente funcional llamado AgregarCategoria que recibe tres props:
// agregarCategoria: función para agregar una nueva categoría
// categorias: lista actual de categorías
// eliminarCategoria: función para eliminar una categoría específica
function AgregarCategoria({ agregarCategoria, categorias, eliminarCategoria }) {
  // useState: se utiliza para manejar el estado local del valor del input de nueva categoría
  const [nuevaCategoria, setNuevaCategoria] = useState('');

  // Función que se ejecuta cuando hay un cambio en el input.
  // Actualiza el estado 'nuevaCategoria' con el valor del input.
  const manejarCambio = (e) => {
    setNuevaCategoria(e.target.value);
  };

  // Función que maneja el envío del formulario.
  // Verifica que la categoría no esté vacía ni repetida en la lista de categorías.
  const manejarSubmit = (e) => {
    e.preventDefault(); // Evita el comportamiento predeterminado de recargar la página.
    if (nuevaCategoria.trim() && !categorias.includes(nuevaCategoria)) {
      agregarCategoria(nuevaCategoria); // Llama la función para agregar la categoría.
      setNuevaCategoria(''); // Resetea el input después de agregar.
    }
  };

  return (
    <div>
      <h3>Agregar Categoría</h3>
      {/* Formulario que permite agregar una nueva categoría */}
      <form onSubmit={manejarSubmit}>
        <input
          type="text"
          value={nuevaCategoria} // Vincula el valor del input al estado local 'nuevaCategoria'
          onChange={manejarCambio} // Cada cambio en el input actualiza el estado
          placeholder="Nueva Categoría" // Texto de ejemplo dentro del input
        />
        <button type="submit">Agregar</button> {/* Botón para enviar el formulario */}
      </form>

      <h3>Categorías</h3>
      {/* Lista de categorías renderizada dinámicamente */}
      <ul>
        {/* Recorre la lista de categorías y las muestra como elementos de la lista */}
        {categorias.map((categoria, index) => (
          <li key={index} className="list-group-item d-flex justify-content-between align-items-center">
            {categoria} {/* Muestra el nombre de la categoría */}
            <i 
              className="bi bi-trash text-danger" 
              style={{ cursor: 'pointer' }} 
              onClick={() => eliminarCategoria(index)} // Llama la función eliminarCategoria al hacer clic en el icono
            ></i>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default AgregarCategoria;

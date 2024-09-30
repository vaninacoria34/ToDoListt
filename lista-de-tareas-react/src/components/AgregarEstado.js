import React, { useState } from 'react';

// Definimos el componente funcional AgregarEstado que recibe tres props:
// agregarEstado: función que se encarga de agregar un nuevo estado.
// estados: la lista actual de estados.
// eliminarEstado: función que se encarga de eliminar un estado específico.
function AgregarEstado({ agregarEstado, estados, eliminarEstado }) {
  // useState para gestionar el estado del input donde el usuario introduce un nuevo estado.
  const [nuevoEstado, setNuevoEstado] = useState('');

  // Función que se ejecuta cada vez que el input cambia (cuando el usuario escribe).
  // Actualiza el estado local 'nuevoEstado' con el valor del input.
  const manejarCambio = (e) => {
    setNuevoEstado(e.target.value);
  };

  // Función que maneja el envío del formulario. 
  // Previene el comportamiento predeterminado (recargar la página) y 
  // valida que el estado ingresado no esté vacío ni repetido.
  const manejarSubmit = (e) => {
    e.preventDefault(); // Evita la recarga de la página al enviar el formulario.
    if (nuevoEstado.trim() && !estados.includes(nuevoEstado)) { // Validación
      agregarEstado(nuevoEstado); // Si es válido, agrega el estado a la lista.
      setNuevoEstado(''); // Limpia el input una vez que el estado ha sido agregado.
    }
  };

  return (
    <div>
      <h3>Agregar Estado</h3>
      {/* Formulario para agregar un nuevo estado */}
      <form onSubmit={manejarSubmit}>
        <input
          type="text"
          value={nuevoEstado} // El valor del input está vinculado al estado local 'nuevoEstado'.
          onChange={manejarCambio} // Se llama cada vez que el input cambia.
          placeholder="Nuevo Estado" // Texto de ejemplo en el input.
        />
        <button type="submit">Agregar</button> {/* Botón para enviar el formulario */}
      </form>

      <h3>Estados</h3>
      {/* Lista de estados renderizada dinámicamente */}
      <ul>
        {/* Recorre la lista de estados y los muestra en una lista ordenada */}
        {estados.map((estado, index) => (
          <li key={index} className="list-group-item d-flex justify-content-between align-items-center">
            {estado} {/* Muestra el nombre del estado */}
            <i 
              className="bi bi-trash text-danger" // Icono de eliminar estado
              style={{ cursor: 'pointer' }} 
              onClick={() => eliminarEstado(index)} // Al hacer clic, elimina el estado por índice
            ></i>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default AgregarEstado;

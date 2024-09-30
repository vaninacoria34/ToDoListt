import React, { useState } from 'react';

// Definimos un componente funcional llamado FormularioTareas que recibe tres props: categorias, estados y agregarTarea.
function FormularioTareas({ categorias, estados, agregarTarea }) {
  
  // Definimos varios estados con useState para manejar los valores del formulario.
  // 'titulo' guarda el valor del campo de texto para el título de la tarea, comenzando como una cadena vacía.
  const [titulo, setTitulo] = useState('');
  
  // 'descripcion' almacena el texto del campo de descripción.
  const [descripcion, setDescripcion] = useState('');
  
  // 'categoria' se inicializa con la primera categoría que se pasa a través de las props.
  const [categoria, setCategoria] = useState(categorias[0]);
  
  // 'prioridad' se inicializa como "Alta" por defecto, pero el usuario puede cambiarla.
  const [prioridad, setPrioridad] = useState('Alta');
  
  // 'estado' también se inicializa con el primer valor del array de estados pasado en las props.
  const [estado, setEstado] = useState(estados[0]);

  // Esta función se llama cuando el usuario envía el formulario.
  const handleSubmit = (e) => {
    e.preventDefault(); // Evita que el formulario recargue la página al ser enviado.
    
    // Llamamos a la función agregarTarea, pasando un objeto con los valores actuales del formulario.
    agregarTarea({ 
      title: titulo, // Título de la tarea
      description: descripcion, // Descripción de la tarea
      category: categoria, // Categoría seleccionada
      priority: prioridad, // Prioridad seleccionada
      status: estado, // Estado seleccionado
      completed: false // La tarea se crea como no completada
    });
    
    // Después de agregar la tarea, limpiamos los campos de título y descripción.
    setTitulo('');
    setDescripcion('');
  };

  return (
    // El formulario llama a handleSubmit cuando se envía.
    <form onSubmit={handleSubmit}>
      
      {/* Campo de entrada para el título de la tarea */}
      <div className="mb-3">
        <label className="form-label">Título</label>
        <input
          type="text"
          className="form-control"
          value={titulo} // El valor del input está vinculado al estado 'titulo'
          onChange={(e) => setTitulo(e.target.value)} // Actualizamos 'titulo' con el nuevo valor que ingrese el usuario.
          required // Este campo es obligatorio
        />
      </div>
      
      {/* Campo de texto para la descripción de la tarea */}
      <div className="mb-3">
        <label className="form-label">Descripción</label>
        <textarea
          className="form-control"
          value={descripcion} // El valor está vinculado a 'descripcion'
          onChange={(e) => setDescripcion(e.target.value)} // Actualizamos 'descripcion' con el valor ingresado por el usuario.
          required // Este campo también es obligatorio
        />
      </div>

      {/* Selector para elegir la categoría de la tarea */}
      <label className="form-label">Categoría</label>
      <select
        className="form-control mb-3"
        value={categoria} // Vinculado al estado 'categoria'
        onChange={(e) => setCategoria(e.target.value)} // Actualizamos 'categoria' cuando el usuario selecciona una nueva opción.
      >
        {categorias.map((cat, index) => (
          <option key={index} value={cat}>{cat}</option> // Mostramos cada categoría en el selector
        ))}
      </select>

      {/* Selector para elegir la prioridad de la tarea */}
      <label className="form-label">Prioridad</label>
      <select
        className="form-control mb-3"
        value={prioridad} // Vinculado al estado 'prioridad'
        onChange={(e) => setPrioridad(e.target.value)} // Actualizamos 'prioridad' cuando el usuario cambia su valor.
      >
        <option value="Alta">Alta</option> 
        <option value="Media">Media</option> 
        <option value="Baja">Baja</option> 
      </select>

      {/* Selector para elegir el estado de la tarea */}
      <label className="form-label">Estado</label>
      <select
        className="form-control mb-3"
        value={estado} // Vinculado al estado 'estado'
        onChange={(e) => setEstado(e.target.value)} // Actualizamos 'estado' cuando se selecciona una nueva opción.
      >
        {estados.map((est, index) => (
          <option key={index} value={est}>{est}</option> // Mostramos cada estado en el selector
        ))}
      </select>

      {/* Botón para enviar el formulario */}
      <button type="submit" className="btn btn-primary">Agregar Tarea</button>
    </form>
  );
}

// Exportamos el componente para que pueda ser usado en otros archivos.
export default FormularioTareas;

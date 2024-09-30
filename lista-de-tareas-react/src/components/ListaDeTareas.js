import React from 'react';

// Definimos el componente funcional ListaDeTareas. Recibe tres props: 
// 'tareas' (lista de tareas), 'eliminarTarea' (función para eliminar una tarea), 
// y 'alternarEstadoTarea' (función para marcar una tarea como completada o pendiente).
function ListaDeTareas({ tareas, eliminarTarea, alternarEstadoTarea }) {
  return (
    // Creamos una lista desordenada (<ul>) con la clase Bootstrap "list-group" 
    // para estilizar la lista de tareas.
    <ul id="task-list" className="list-group">
      
      {/* Iteramos sobre el array 'tareas' usando .map() para generar un <li> por cada tarea. */}
      {tareas.map((task, index) => (
        
        // Cada elemento <li> debe tener un 'key' único (aquí usamos 'index') 
        // para que React pueda manejar los elementos de la lista correctamente.
        <li key={index} className="list-group-item d-flex justify-content-between align-items-center">
          
          {/* Esta sección muestra el título y la descripción de la tarea */}
          <div>
            {/* Mostramos el título de la tarea en negrita */}
            <strong>{task.title}</strong> - {task.description}
            
            {/* Mostramos una etiqueta (badge) indicando si la tarea está completada o pendiente */}
            <span className={`badge bg-${task.completed ? 'success' : 'warning'}`}>
              {task.completed ? 'Completada' : 'Pendiente'}
            </span>
            
            {/* Mostramos los detalles adicionales: categoría, prioridad y estado */}
            <div>
              Categoría: {task.category} - Prioridad: {task.priority} - Estado: {task.status}
            </div>
          </div>

          {/* Esta sección contiene botones de acción (Completar/Reabrir y Eliminar) */}
          <div>
            {/* Botón para alternar entre completar o reabrir una tarea */}
            <button
              className="btn btn-success btn-sm me-2"
              onClick={() => alternarEstadoTarea(index)} // Llamamos a la función 'alternarEstadoTarea' pasando el índice de la tarea.
            >
              {task.completed ? 'Reabrir' : 'Completar'} // El texto del botón cambia dependiendo del estado de la tarea.
            </button>

            {/* Botón para eliminar una tarea */}
            <button
              className="btn btn-danger btn-sm"
              onClick={() => eliminarTarea(index)} // Llamamos a 'eliminarTarea' pasando el índice de la tarea que queremos eliminar.
            >
              Eliminar
            </button>
          </div>
        </li>
      ))}
    </ul>
  );
}

// Exportamos el componente para usarlo en otros archivos.
export default ListaDeTareas;

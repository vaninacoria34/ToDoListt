import React, { useState, useEffect } from 'react';

// Definimos un componente funcional llamado FormularioTareas que recibe tres props: categorias, estados y agregarTarea.
function FormularioTareas({ categorias: categoriasProp, estados: estadosProp, agregarTarea }) {
  
  // Definimos varios estados con useState para manejar los valores del formulario.
  // 'titulo' guarda el valor del campo de texto para el título de la tarea, comenzando como una cadena vacía.
  const [titulo, setTitulo] = useState('');
  
  // 'descripcion' almacena el texto del campo de descripción.
  const [descripcion, setDescripcion] = useState('');
  
  const [categoria, setCategoria] = useState('');
  const [categorias, setCategorias] = useState([]);
  const [prioridad, setPrioridad] = useState('');
  const [prioridades, setPrioridades] = useState([]);
  const [estado, setEstado] = useState('');
  const [estados, setEstados] = useState([]);
  const [fechaVencimiento, setFechaVencimiento] = useState('');

  // Función para obtener categorías desde el backend
  const obtenerCategorias = async () => {
    try {
      const response = await fetch('http://localhost:3001/categoria');
      const data = await response.json();
      setCategorias(data); // Guardamos las categorías
      if (data.length > 0) {
        setCategoria(data[0].PK_Categoria); // Establecemos la primera categoría como predeterminada
      }
    } catch (error) {
      console.error('Error al obtener categorías:', error);
    }
  };

  // Función para obtener estados desde el backend
  const obtenerEstados = async () => {
    try {
      const response = await fetch('http://localhost:3001/estado');
      const data = await response.json();
      setEstados(data); // Guardamos los estados en el estado
      if (data.length > 0) {
        setEstado(data[0].PK_Estado); // Establecemos el primer estado como predeterminado
      }
    } catch (error) {
      console.error('Error al obtener estados:', error);
    }
  };

  // Función para obtener prioridades desde el backend
  const obtenerPrioridades = async () => {
    try {
      const response = await fetch('http://localhost:3001/prioridad');
      const data = await response.json();
      setPrioridades(data); // Guardamos las prioridades en el estado
      if (data.length > 0) {
        setPrioridad(data[0].PK_Prioridad); // Establecemos la primera prioridad como predeterminada
      }
    } catch (error) {
      console.error('Error al obtener prioridades:', error);
    }
  };

  // Esta función se llama cuando el usuario envía el formulario.
  const handleSubmit = (e) => {
    e.preventDefault(); // Evita que el formulario recargue la página al ser enviado.
    
    // Llamamos a la función agregarTarea, pasando un objeto con los valores actuales del formulario.
    agregarTarea({ 
      title: titulo, // Título de la tarea
      description: descripcion, // Descripción de la tarea
      category: categoria.nombre, // Categoría seleccionada
      priority: prioridad, // Prioridad seleccionada
      status: estado, // Estado seleccionado
      dueDate: fechaVencimiento, // Fecha de vencimiento
      completed: false // La tarea se crea como no completada
    });
    
    // Después de agregar la tarea, limpiamos los campos de título, descripción y fecha de vencimiento.
    setTitulo('');
    setDescripcion('');
    setFechaVencimiento('');
  };

    // useEffect para cargar las categorías, estados y prioridades al montar el componente
    useEffect(() => {
      obtenerCategorias(); // Carga las categorías
      obtenerEstados(); // Carga los estados
      obtenerPrioridades(); // Carga las prioridades
    }, []);

  return (
    // El formulario llama a handleSubmit cuando se envía.
    <form onSubmit={handleSubmit}>

    <h3>Agregar Tarea</h3>
      
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
          <option key={index} value={cat.PK_Categoria}>{cat.nombre}</option> // Mostramos cada categoría en el selector
        ))}
      </select>

      {/* Selector para elegir la prioridad de la tarea */}
      <label className="form-label">Prioridad</label>
      <select
        className="form-control mb-3"
        value={prioridad} // Vinculado al estado 'prioridad'
        onChange={(e) => setPrioridad(e.target.value)} // Actualizamos 'prioridad' cuando el usuario cambia su valor.
      >
        {prioridades.map((pri, index) => (
          <option key={index} value={pri.PK_Prioridad}>{pri.nombre}</option>
        ))}
      </select>

      {/* Selector para elegir el estado de la tarea */}
      <label className="form-label">Estado</label>
      <select
        className="form-control mb-3"
        value={estado} // Vinculado al estado 'estado'
        onChange={(e) => setEstado(e.target.value)} // Actualizamos 'estado' cuando se selecciona una nueva opción.
      >
        {estados.map((est, index) => (
          <option key={index} value={est.PK_Estado}>{est.nombre}</option> // Mostramos cada estado en el selector
        ))}
      </select>

      {/* Input para ingresar fecha de vencimiento */}
      {/* Restringir que la fecha sea a futuro */}
      <div className="mb-3">
        <label className="form-label">Fecha de vencimiento</label>
        <input
          type="date"
          className="form-control"
          min={new Date().toISOString().split('T')[0]}
          value={fechaVencimiento} // Vinculado al estado 'fechaVencimiento'
          onChange={(e) => setFechaVencimiento(e.target.value)} // Actualizar 'fechaVencimiento'
          required
        />
      </div>

      {/* Botón para enviar el formulario */}
      <button type="submit" className="btn btn-primary">Agregar Tarea</button>
    </form>
  );
}

// Exportamos el componente para que pueda ser usado en otros archivos.
export default FormularioTareas;

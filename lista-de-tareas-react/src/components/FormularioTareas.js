import React, { useState, useEffect } from 'react';
import { Link, useNavigate  } from 'react-router-dom';

// Definimos un componente funcional llamado FormularioTareas que recibe tres props: categorias, estados y agregarTarea.
function FormularioTareas({ agregarTarea }) {
  
  // Definimos varios estados con useState para manejar los valores del formulario.
  const [titulo, setTitulo] = useState('');
  const [descripcion, setDescripcion] = useState('');
  const [categoria, setCategoria] = useState('');
  const [categorias, setCategorias] = useState([]);
  const [prioridad, setPrioridad] = useState('');
  const [prioridades, setPrioridades] = useState([]);
  const [estado, setEstado] = useState('');
  const [estados, setEstados] = useState([]);
  const [fechaVencimiento, setFechaVencimiento] = useState('');
  const userId = JSON.parse(localStorage.getItem('user')).userId;
  const [successMessage, setSuccessMessage] = useState('');
  const navigate = useNavigate();

  // Función para obtener categorías desde el backend
  const obtenerCategorias = async () => {
    try {
      const response = await fetch('http://localhost:3001/categoria');
      const data = await response.json();
      setCategorias(data);
      if (data.length > 0) {
        setCategoria(data[0].PK_Categoria);
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
      setEstados(data);
      if (data.length > 0) {
        setEstado(data[0].PK_Estado);
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
      setPrioridades(data);
      if (data.length > 0) {
        setPrioridad(data[0].PK_Prioridad);
      }
    } catch (error) {
      console.error('Error al obtener prioridades:', error);
    }
  };

  // Esta función se llama cuando el usuario envía el formulario.
  const handleSubmit = async (e) => {
    e.preventDefault(); // Evita que el formulario recargue la página al ser enviado.

    // Crear el objeto de la nueva tarea
    const nuevaTarea = { 
      titulo, 
      descripcion, 
      fecha_creacion: new Date().toISOString().split('T')[0], // Fecha de creación como fecha actual
      fecha_limite: fechaVencimiento, 
      FK_Usuario: userId,
      FK_Estado: estado, 
      FK_Prioridad: prioridad, 
      FK_Categoria: categoria 
    };

    try {
      const response = await fetch('http://localhost:3001/tarea/add', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(nuevaTarea),
      });

      const result = await response.json();

      if (response.ok) {
        agregarTarea(nuevaTarea); // Llama a la función agregarTarea pasada como prop
        setSuccessMessage('Tarea agregada con éxito!');
        // Limpia los campos del formulario
        setTitulo('');
        setDescripcion('');
        setFechaVencimiento('');

        setTimeout(() => {
          setSuccessMessage('');
          navigate('/tareas');
        }, 3000);
      } else {
        console.error('Error al agregar tarea:', result.message);
      }
    } catch (error) {
      console.error('Error al agregar tarea:', error);
    }
  };

  // useEffect para cargar las categorías, estados y prioridades al montar el componente
  useEffect(() => {
    obtenerCategorias(); // Carga las categorías
    obtenerEstados(); // Carga los estados
    obtenerPrioridades(); // Carga las prioridades
  }, []);

  // Función para cerrar el mensaje de éxito
  const cerrarMensaje = () => {
    setSuccessMessage('');
  };

  return (
    <form onSubmit={handleSubmit}>
      <h3>Agregar Tarea</h3>

      {/* Mensaje de éxito */}
      {successMessage && (
        <div className="alert alert-success d-flex justify-content-between align-items-center">
          {successMessage}
          <button onClick={cerrarMensaje} className="btn-close" aria-label="Close"></button> {/* Botón para cerrar */}
        </div>
      )}
      
      <div className="mb-3">
        <label className="form-label">Título</label>
        <input
          type="text"
          className="form-control"
          value={titulo}
          placeholder='Título de la tarea'
          onChange={(e) => setTitulo(e.target.value)}
          required
        />
      </div>
      
      <div className="mb-3">
        <label className="form-label">Descripción</label>
        <textarea
          className="form-control"
          value={descripcion}
          placeholder='Descripción de la tarea'
          onChange={(e) => setDescripcion(e.target.value)}
          required
        />
      </div>

      <label className="form-label">Categoría</label>
      <select
        className="form-control mb-3"
        value={categoria}
        onChange={(e) => setCategoria(e.target.value)}
      >
        {categorias.map((cat, index) => (
          <option key={index} value={cat.PK_Categoria}>{cat.nombre}</option>
        ))}
      </select>

      <label className="form-label">Prioridad</label>
      <select
        className="form-control mb-3"
        value={prioridad}
        onChange={(e) => setPrioridad(e.target.value)}
      >
        {prioridades.map((pri, index) => (
          <option key={index} value={pri.PK_Prioridad}>{pri.nombre}</option>
        ))}
      </select>

      <label className="form-label">Estado</label>
      <select
        className="form-control mb-3"
        value={estado}
        onChange={(e) => setEstado(e.target.value)}
      >
        {estados.map((est, index) => (
          <option key={index} value={est.PK_Estado}>{est.nombre}</option>
        ))}
      </select>

      <div className="mb-3">
        <label className="form-label">Fecha de vencimiento</label>
        <input
          type="date"
          className="form-control"
          min={new Date().toISOString().split('T')[0]}
          value={fechaVencimiento}
          onChange={(e) => setFechaVencimiento(e.target.value)}
          required
        />
      </div>

      <div className="d-flex justify-content-center">
        <button 
          type="button" 
          className="btn btn-secondary btn-md">
          <Link to="/tareas" style={{ textDecoration: 'none', color: 'inherit' }}>
          Cancelar
          </Link>
        </button>
        <button 
          type="submit" 
          className="btn btn-primary btn-md">
          Agregar
        </button>
      </div>

    </form>
  );
}

export default FormularioTareas;

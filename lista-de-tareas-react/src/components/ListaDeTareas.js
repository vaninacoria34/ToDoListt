import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

function ListaDeTareas() {
  const userId = JSON.parse(localStorage.getItem('user'))?.userId;
  const [tareas, setTareas] = useState([]);
  const [filtro, setFiltro] = useState({ estado: '', prioridad: '', categoria: '' });
  const [categorias, setCategorias] = useState([]);
  const [prioridades, setPrioridades] = useState([]);
  const [estados, setEstados] = useState([]);
  const [successMessage, setSuccessMessage] = useState('');

  // Cargar tareas desde el backend
  const cargarTareas = async () => {
    try {
      const response = await fetch(`http://localhost:3001/tarea/${userId}`);
      const data = await response.json();
      if (Array.isArray(data)) {
        setTareas(data);
      } else {
        console.error('La respuesta no es un array:', data);
        setTareas([]);
      }
    } catch (error) {
      console.error('Error al cargar las tareas:', error);
      setTareas([]);
    }
  };

  // Cargar categorías, estados y prioridades desde el backend
  const cargarFiltros = async () => {
    try {
      const [categoriasRes, prioridadesRes, estadosRes] = await Promise.all([
        fetch('http://localhost:3001/categoria'),
        fetch('http://localhost:3001/prioridad'),
        fetch('http://localhost:3001/estado'),
      ]);

      const categoriasData = await categoriasRes.json();
      const prioridadesData = await prioridadesRes.json();
      const estadosData = await estadosRes.json();

      setCategorias(categoriasData);
      setPrioridades(prioridadesData);
      setEstados(estadosData);
    } catch (error) {
      console.error('Error al cargar los filtros:', error);
    }
  };

  useEffect(() => {
    cargarTareas(); // Carga las tareas
    cargarFiltros(); // Carga los valores para los filtros
  }, [userId]);

  // Manejar cambio en los filtros
  const handleFiltroChange = (e) => {
    const { name, value } = e.target;
    setFiltro({ ...filtro, [name]: value });
  };

  // Filtrar tareas basadas en los selectores de filtro
  const tareasFiltradas = tareas.filter((tarea) => {
    return (
      (filtro.estado === '' || tarea.FK_Estado === parseInt(filtro.estado)) &&
      (filtro.prioridad === '' || tarea.FK_Prioridad === parseInt(filtro.prioridad)) &&
      (filtro.categoria === '' || tarea.FK_Categoria === parseInt(filtro.categoria))
    );
  });

  const eliminarTarea = async (id) => {
    try {
      const response = await fetch(`http://localhost:3001/tarea/delete/${id}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (response.ok) {
        setTareas(tareas.filter(tarea => tarea.PK_Tarea !== id));
        setSuccessMessage('Tarea eliminada correctamente');
      } else {
        alert('Error al eliminar la tarea');
      }
    } catch (error) {
      console.error('Error al eliminar la tarea:', error);
    }
  };

  // Función para cerrar el mensaje de éxito
  const cerrarMensaje = () => {
    setSuccessMessage('');
  };

  return (
    <div>
      {/* Mensaje de éxito */}
      {successMessage && (
        <div className="alert alert-success d-flex justify-content-between align-items-center">
          {successMessage}
          <button onClick={cerrarMensaje} className="btn-close" aria-label="Close"></button> {/* Botón para cerrar */}
        </div>
      )}

      {/* Selectores para filtrar */}
      <div className="row mb-3">
        <div className="col-md-4">
          <select name="estado" value={filtro.estado} onChange={handleFiltroChange} className="form-control">
            <option value="">Todos los estados</option>
            {estados.map((estado) => (
              <option key={estado.PK_Estado} value={estado.PK_Estado}>
                {estado.nombre}
              </option>
            ))}
          </select>
        </div>

        <div className="col-md-4">
          <select name="prioridad" value={filtro.prioridad} onChange={handleFiltroChange} className="form-control">
            <option value="">Todas las prioridades</option>
            {prioridades.map((prioridad) => (
              <option key={prioridad.PK_Prioridad} value={prioridad.PK_Prioridad}>
                {prioridad.nombre}
              </option>
            ))}
          </select>
        </div>

        <div className="col-md-4">
          <select name="categoria" value={filtro.categoria} onChange={handleFiltroChange} className="form-control">
            <option value="">Todas las categorías</option>
            {categorias.map((categoria) => (
              <option key={categoria.PK_Categoria} value={categoria.PK_Categoria}>
                {categoria.nombre}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Lista de tareas */}
      <ul id="task-list" className="list-group">
        {tareasFiltradas.map((task) => (
          <li key={task.PK_Tarea} className="list-group-item">
            <div>
              <strong>{task.titulo}</strong>
              <div>{task.descripcion}</div>
              <div>
                <span>Categoría: {task.Categoria}</span><br />
                <span>Prioridad: {task.Prioridad}</span><br />
                <span>Estado: {task.Estado}</span><br />
                <span>Fecha de creación: {task.fecha_creacion}</span><br />
                <span>Fecha de vencimiento: {task.fecha_limite}</span>
              </div>
              <Link to={`/editTarea/${task.PK_Tarea}`} className="btn btn-warning btn-sm me-2">
                Editar
              </Link>
              <button
                className="btn btn-danger btn-sm"
                onClick={() => eliminarTarea(task.PK_Tarea)}
              >
                Eliminar
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default ListaDeTareas;

import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';

function EditarTarea() {
  const { tareaId } = useParams(); 
  const navigate = useNavigate();
  
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

  const obtenerTarea = async () => {
    try {
      const response = await fetch(`http://localhost:3001/tarea/id/${tareaId}`);
      const data = await response.json();

      setTitulo(data.titulo);
      setDescripcion(data.descripcion);
      setFechaVencimiento(convertirFechaFormato(data.fecha_limite)); // Convertir la fecha
      setCategoria(data.FK_Categoria);
      setPrioridad(data.FK_Prioridad);
      setEstado(data.FK_Estado);
    } catch (error) {
      console.error('Error al obtener la tarea:', error);
    }
  };

  // Función para convertir una fecha de formato "dd/MM/yyyy" a "yyyy-MM-dd"
  const convertirFechaFormato = (fecha) => {
    const [dia, mes, anio] = fecha.split('/');
    return `${anio}-${mes.padStart(2, '0')}-${dia.padStart(2, '0')}`;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const tareaActualizada = { 
      titulo, 
      descripcion, 
      fecha_limite: fechaVencimiento, 
      FK_Usuario: userId,
      FK_Estado: estado, 
      FK_Prioridad: prioridad, 
      FK_Categoria: categoria 
    };

    try {
      const response = await fetch(`http://localhost:3001/tarea/edit/${tareaId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(tareaActualizada),
      });

      if (response.ok) {
        setSuccessMessage('Tarea editada con éxito!');
        setTimeout(() => {
          navigate('/tareas');
        }, 2000);
      } else {
        const result = await response.json();
        console.error('Error al editar tarea:', result.message);
      }
    } catch (error) {
      console.error('Error al editar tarea:', error);
    }
  };

  useEffect(() => {
    obtenerCategorias();
    obtenerEstados();
    obtenerPrioridades();
    obtenerTarea();
  }, [tareaId]);

  // Función para cerrar el mensaje de éxito
  const cerrarMensaje = () => {
    setSuccessMessage('');
  };

  return (
    <form onSubmit={handleSubmit}>
      <h3>Editar Tarea</h3>
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
          onChange={(e) => setTitulo(e.target.value)}
          required
        />
      </div>

      <div className="mb-3">
        <label className="form-label">Descripción</label>
        <textarea
          className="form-control"
          value={descripcion}
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
        {categorias.map((cat) => (
          <option key={cat.PK_Categoria} value={cat.PK_Categoria}>{cat.nombre}</option>
        ))}
      </select>

      <label className="form-label">Prioridad</label>
      <select
        className="form-control mb-3"
        value={prioridad}
        onChange={(e) => setPrioridad(e.target.value)}
      >
        {prioridades.map((pri) => (
          <option key={pri.PK_Prioridad} value={pri.PK_Prioridad}>{pri.nombre}</option>
        ))}
      </select>

      <label className="form-label">Estado</label>
      <select
        className="form-control mb-3"
        value={estado}
        onChange={(e) => setEstado(e.target.value)}
      >
        {estados.map((est) => (
          <option key={est.PK_Estado} value={est.PK_Estado}>{est.nombre}</option>
        ))}
      </select>

      <div className="mb-3">
        <label className="form-label">Fecha de vencimiento</label>
        <input
          type="date"
          className="form-control"
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
          Guardar
        </button>
      </div>

    </form>
  );
}

export default EditarTarea;

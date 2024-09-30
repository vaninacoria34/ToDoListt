import React, { useState, useEffect } from 'react';
import './styles.css';
import AgregarCategoria from './components/AgregarCategoria';
import AgregarEstado from './components/AgregarEstado';
import FormularioTareas from './components/FormularioTareas';
import ListaDeTareas from './components/ListaDeTareas'
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';

function App() {
  const [tasks, setTasks] = useState([]);
  const [categorias, setCategorias] = useState(['Trabajo', 'Estudio', 'Personal']);
  const [estados, setEstados] = useState(['Pendiente', 'En progreso', 'Completada']);
  const [darkMode, setDarkMode] = useState(false);

  // Cargar desde localStorage al montar el componente
  useEffect(() => {
    const storedTasks = JSON.parse(localStorage.getItem('tasks')) || [];
    setTasks(storedTasks);

    const storedCategories = JSON.parse(localStorage.getItem('categories')) || [];
    setCategorias(storedCategories.length ? storedCategories : categorias);

    const storedStatuses = JSON.parse(localStorage.getItem('statuses')) || [];
    setEstados(storedStatuses.length ? storedStatuses : estados);

    const storedDarkMode = localStorage.getItem('darkMode');
    if (storedDarkMode === 'enabled') {
      setDarkMode(true);
    }
  }, [categorias, estados]);

  // Guardar en localStorage cuando cambien las tareas, categorías, estados o el modo oscuro
  useEffect(() => {
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }, [tasks]);

  useEffect(() => {
    localStorage.setItem('categories', JSON.stringify(categorias));
  }, [categorias]);

  useEffect(() => {
    localStorage.setItem('statuses', JSON.stringify(estados));
  }, [estados]);

  useEffect(() => {
    document.body.classList.toggle('dark-mode', darkMode);
    localStorage.setItem('darkMode', darkMode ? 'enabled' : 'disabled');
  }, [darkMode]);

  // Funciones para agregar y gestionar tareas, categorías, y estados
  const agregarTarea = (nuevaTarea) => {
    setTasks([...tasks, nuevaTarea]);
  };

  const eliminarTarea = (index) => {
    const nuevasTareas = tasks.filter((_, i) => i !== index);
    setTasks(nuevasTareas);
  };

  const alternarEstadoTarea = (index) => {
    const nuevasTareas = tasks.map((task, i) =>
      i === index ? { ...task, completed: !task.completed } : task
    );
    setTasks(nuevasTareas);
  };

  const agregarCategoria = (nuevaCategoria) => {
    setCategorias([...categorias, nuevaCategoria]);
  };

  const agregarEstado = (nuevoEstado) => {
    setEstados([...estados, nuevoEstado]);
  };

  const eliminarCategoria = (index) => {
    const nuevasCategorias = categorias.filter((_, i) => i !== index);
    setCategorias(nuevasCategorias);
  };

  return (
    <Router>
      <div className={`app ${darkMode ? 'dark-mode' : ''}`}>
        <header className="text-center mt-4">
          <h1>Agenda de Tareas</h1>
          <button
            id="toggle-contrast"
            className="btn btn-secondary"
            onClick={() => setDarkMode(!darkMode)}
          >
            {darkMode ? 'Desactivar Modo Oscuro' : 'Activar Modo Oscuro'}
          </button>
          <nav>
            <Link to="/">Inicio</Link> | 
            <Link to="/agregar-mas"> Agregar Categorías/Estados</Link>
          </nav>
        </header>
        <div className="d-flex mt-4">
          <div className="flex-grow-1 p-3">
            <Routes>
              <Route path="/" element={
                <>
                  <FormularioTareas 
                    categorias={categorias} 
                    estados={estados} 
                    agregarTarea={agregarTarea} 
                  />
                  <ListaDeTareas
                    tareas={tasks}
                    eliminarTarea={eliminarTarea}
                    alternarEstadoTarea={alternarEstadoTarea}
                  />
                </>
              } />
              <Route path="/agregar-mas" element={
                <>
                  <AgregarCategoria 
                    agregarCategoria={agregarCategoria} 
                    categorias={categorias} 
                    eliminarCategoria={eliminarCategoria} // Pasamos eliminarCategoria
                  />
                  <AgregarEstado 
                    agregarEstado={agregarEstado} 
                    estados={estados} 
                  />
                </>
              } />
            </Routes>
          </div>
        </div>
      </div>
    </Router>
  );
}

export default App;

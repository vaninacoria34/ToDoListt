import React, { useState, useEffect } from 'react';
import './styles.css';
import AgregarCategoria from './components/AgregarCategoria';
import AgregarEstado from './components/AgregarEstado';
import FormularioTareas from './components/FormularioTareas';
import ListaDeTareas from './components/ListaDeTareas';
import HomePage from './components/HomePage';
import RegistroPage from './components/RegistroPage'; 
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';  

function App() {
  const [tasks, setTasks] = useState([]);
  const [categorias, setCategorias] = useState(['Trabajo', 'Estudio', 'Personal']);
  const [estados, setEstados] = useState(['Pendiente', 'En progreso', 'Completada']);
  const [darkMode, setDarkMode] = useState(false);

  // Cargar datos desde localStorage al montar el componente (sin dependencias innecesarias)
  useEffect(() => {
    const storedTasks = JSON.parse(localStorage.getItem('tasks')) || [];
    setTasks(storedTasks);

    const storedCategories = JSON.parse(localStorage.getItem('categories')) || [];
    setCategorias(storedCategories.length ? storedCategories : ['Trabajo', 'Estudio', 'Personal']);

    const storedStatuses = JSON.parse(localStorage.getItem('statuses')) || [];
    setEstados(storedStatuses.length ? storedStatuses : ['Pendiente', 'En progreso', 'Completada']);

    const storedDarkMode = localStorage.getItem('darkMode');
    if (storedDarkMode === 'enabled') {
      setDarkMode(true);
    }
  }, []);  // Solo se ejecuta al montar el componente

  // Guardar tareas en localStorage cuando cambien
  useEffect(() => {
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }, [tasks]);

  // Guardar categorías en localStorage cuando cambien
  useEffect(() => {
    localStorage.setItem('categories', JSON.stringify(categorias));
  }, [categorias]);

  // Guardar estados en localStorage cuando cambien
  useEffect(() => {
    localStorage.setItem('statuses', JSON.stringify(estados));
  }, [estados]);

  // Manejo del modo oscuro (dark mode)
  useEffect(() => {
    if (darkMode) {
      document.body.classList.add('dark-mode');
    } else {
      document.body.classList.remove('dark-mode');
    }
    localStorage.setItem('darkMode', darkMode ? 'enabled' : 'disabled');
  }, [darkMode]);

  // Función para alternar el modo oscuro
  const toggleDarkMode = () => {
    setDarkMode((prevMode) => !prevMode);
  };

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

  const eliminarEstado = (index) => {
    const nuevosEstados = estados.filter((_, i) => i !== index);
    setEstados(nuevosEstados);
  };

  return (
    <Router>
      <div className={`app ${darkMode ? 'dark-mode' : ''}`}>
        {/* Barra de navegación con Bootstrap */}
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
          <div className="container-fluid">
            <Link className="navbar-brand" to="/">Agenda</Link>
            <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
              <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarNav">
              <ul className="navbar-nav ms-auto">
                <li className="nav-item">
                  <Link className="nav-link" to="/">Inicio</Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/registro">Registrarse</Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/tareas">Tareas</Link>
                </li>
              </ul>
            </div>
          </div>
        </nav>

        <div className="container mt-4">
          {/* Botón para activar/desactivar contraste */}
          <button
            id="toggle-contrast"
            className="btn btn-secondary mb-3"
            onClick={toggleDarkMode}  // Usa la nueva función de toggle
          >
            {darkMode ? 'Desactivar Modo Oscuro' : 'Activar Modo Oscuro'}
          </button>
          
          <Routes>
            {/* Página inicial con fondo turquesa y carrusel */}
            <Route path="/" element={<HomePage />} />

            {/* Página de registro */}
            <Route path="/registro" element={<RegistroPage />} />

            {/* Página de Tareas (donde gestionas las categorías, estados y tareas) */}
            <Route path="/tareas" element={
              <>
                <AgregarCategoria 
                  agregarCategoria={agregarCategoria} 
                  categorias={categorias} 
                  eliminarCategoria={eliminarCategoria} 
                />
                <AgregarEstado 
                  agregarEstado={agregarEstado} 
                  estados={estados} 
                  eliminarEstado={eliminarEstado} // Aquí pasamos la función eliminarEstado
                />
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
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;

import React, { useState, useEffect } from 'react';
import './styles.css';
import AgregarCategoria from './components/AgregarCategoria';
import AgregarEstado from './components/AgregarEstado';
import FormularioTareas from './components/FormularioTareas';
import ListaDeTareas from './components/ListaDeTareas';
import EditarTarea from './components/EditarTarea';
import HomePage from './components/HomePage';
import RegistroPage from './components/RegistroPage';
import LogInPage from './components/LogInPage';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';  
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import '@fortawesome/fontawesome-free/css/all.min.css';

function App() {
  const [tasks, setTasks] = useState([]);
  const [categorias, setCategorias] = useState(['Trabajo', 'Estudio', 'Personal']);
  const [estados, setEstados] = useState(['Pendiente', 'En progreso', 'Completada']);
  const [darkMode, setDarkMode] = useState(false);
  const [user, setUser] = useState(null); // Estado para manejar el usuario logueado

  // Cargar datos desde localStorage al montar el componente
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

    // Simulando la carga del usuario desde localStorage o contexto
    const storedUser = JSON.parse(localStorage.getItem('user'));
    if (storedUser) {
      setUser(storedUser); // Establece el usuario logueado
    }
  }, []);  // Solo se ejecuta al montar el componente

  // Guardar tareas, categorías, y estados en localStorage cuando cambien
  useEffect(() => {
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }, [tasks]);

  useEffect(() => {
    localStorage.setItem('categories', JSON.stringify(categorias));
  }, [categorias]);

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

  // Función para manejar el cierre de sesión
  const handleLogout = () => {
    setUser(null); // Limpia el estado del usuario
    localStorage.removeItem('user'); // Elimina el usuario del localStorage
    // Redirigir a la página de inicio después de cerrar sesión
    window.location.href = '/';
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
                {user ? (
                  <>
                    <li className="nav-item dropdown">
                      <a className="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                        Tareas
                      </a>
                      <ul className="dropdown-menu" aria-labelledby="navbarDropdown">
                        <li><Link className="dropdown-item" to="/tareas">Ver Tareas</Link></li>
                        <li><Link className="dropdown-item" to="/addtareas">Agregar Tareas</Link></li>
                      </ul>
                    </li>
                    <li className="nav-item">
                      <Link className="nav-link" to="/categoria">Agregar Categoría</Link>
                    </li>
                    <li className="nav-item">
                      <Link className="nav-link" to="/estado">Agregar Estado</Link>
                    </li>
                    {/* Botón de contraste */}
                    <li className="nav-item">
                      <button
                        id="toggle-contrast"
                        className="btn btn-info"
                        onClick={toggleDarkMode}
                        title={darkMode ? 'Desactivar Modo Oscuro' : 'Activar Modo Oscuro'}
                      >
                        <i className={`fas ${darkMode ? 'fa-sun' : 'fa-moon'}`}></i>
                      </button>
                    </li>
                    <li className="nav-item dropdown">
                      <a className="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                        {`${user.nombre} ${user.apellido}`}
                      </a>
                      <ul className="dropdown-menu" aria-labelledby="navbarDropdown">
                        <li><a className="dropdown-item" onClick={handleLogout}>Cerrar sesión</a></li>
                      </ul>
                    </li>
                  </>
                ) : (
                  <>
                    <li className="nav-item">
                      <Link className="nav-link" to="/login">Iniciar sesión</Link>
                    </li>
                    <li className="nav-item">
                      <Link className="nav-link" to="/registro">Registrarse</Link>
                    </li>
                    {/* Botón de contraste */}
                    <li className="nav-item">
                      <button
                        id="toggle-contrast"
                        className="btn btn-info"
                        onClick={toggleDarkMode}
                        title={darkMode ? 'Desactivar Modo Oscuro' : 'Activar Modo Oscuro'}
                      >
                        <i className={`fas ${darkMode ? 'fa-sun' : 'fa-moon'}`}></i>
                      </button>
                    </li>
                  </>
                )}
              </ul>
            </div>
          </div>
        </nav>


        <div className="container mt-4">
          
          <Routes>
            {/* Página inicial con fondo turquesa y carrusel */}
            <Route path="/" element={<HomePage />} />

            {/* Página de registro */}
            <Route path="/registro" element={<RegistroPage />} />

            {/* Página de inicio de sesión */}
            <Route path="/login" element={<LogInPage setUser={setUser} />} /> {/* Asegúrate de pasar setUser si necesitas iniciar sesión aquí */}

            {/* Página de Tareas */}
            <Route path="/tareas" element={
              <>
                <ListaDeTareas
                  tareas={tasks}
                  eliminarTarea={eliminarTarea}
                  user={user} // Agrega esta línea para pasar el user
                />
              </>
            } />
            {/* Página de Categorías */}
            <Route path="/categoria" element={
              <>
                <AgregarCategoria 
                  agregarCategoria={agregarCategoria} 
                  categorias={categorias} 
                  eliminarCategoria={eliminarCategoria} 
                />
              </>
            } />
            {/* Página de Estados */}
              <Route path="/estado" element={
              <>
                <AgregarEstado 
                  agregarEstado={agregarEstado} 
                  estados={estados} 
                  eliminarEstado={eliminarEstado} // Aquí pasamos la función eliminarEstado
                />
              </>
            } />
            {/* Página de Agregar Tareas */}
              <Route path="/addtareas" element={
              <>
                <FormularioTareas 
                  categorias={categorias} 
                  estados={estados} 
                  agregarTarea={agregarTarea} 
                />
              </>
            } />
            {/* Página de Editar Tareas */}
              <Route path="/editTarea/:tareaId" element={
              <>
                <EditarTarea 
                  categorias={categorias} 
                  estados={estados}
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

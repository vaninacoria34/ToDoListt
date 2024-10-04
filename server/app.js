import express, { urlencoded, json, static } from 'express';
import { join } from 'path';
import session from 'express-session';
const MySQLStore = require('express-mysql-session')(session);
import { initialize, session as _session } from 'passport';
import cors from 'cors';

import { database } from './keys';

// Inicializamos la aplicación
const app = express();

// Configuraciones (Settings)
app.set('port', process.env.PORT || 3001);

// Habilitar CORS
app.use(cors());

// Middlewares
app.use(urlencoded({ extended: false }));
app.use(json());
app.use(session({
    secret: 'secret',
    resave: false,
    saveUninitialized: false,
    store: new MySQLStore(database)
}));
app.use(initialize());
app.use(_session());

// Rutas (URL de nuestro servidor)
/* app.use(require('./routes/index'));  //Ruta principal
app.use(require('./routes/autenticacion'));  // Rutas para Autenticación */
app.use('/tarea', require('./routes/tarea_routes'));  // Rutas para Tareas
app.use('/categoria', require('./routes/categoria_routes'));  // Rutas para Categorías
app.use('/estado', require('./routes/estado_routes'));  // Rutas para Estados
app.use('/prioridad', require('./routes/prioridad_routes'));  // Rutas para Prioridades

// Archivos estáticos (Public)
app.use(static(join(__dirname, 'public')));

// Iniciar el servidor
app.listen(app.get('port'), () => {
    console.log(`Servidor corriendo en el puerto ${app.get('port')}`);
});

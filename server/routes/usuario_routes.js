
const express = require('express');
const router = express.Router();
const usuarioController = require('../controllers/usuario_controller');

// Ruta para registrar un nuevo usuario
router.post('/registro', usuarioController.registrarUsuario);

// Ruta para iniciar sesión
router.post('/login', usuarioController.loginUsuario); 

module.exports = router;

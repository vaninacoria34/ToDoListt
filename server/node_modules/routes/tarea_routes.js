
const express = require('express');
const router = express.Router();
const tareaController = require('../controllers/tarea_controller');

// Rutas para Tareas
router.get('/', tareaController.listTareas);
router.post('/add', tareaController.addTarea);
router.get('/:id', tareaController.getTareaById);
router.put('/edit/:id', tareaController.editTarea);
router.delete('/delete/:id', tareaController.deleteTarea);

module.exports = router;

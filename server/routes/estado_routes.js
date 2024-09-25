
const express = require('express');
const router = express.Router();
const estadoController = require('../controllers/estado_controller');

router.get('/', estadoController.listEstados);
router.post('/add', estadoController.addEstado);
router.get('/:id', estadoController.getEstadoById);
router.put('/edit/:id', estadoController.editEstado);
router.delete('/delete/:id', estadoController.deleteEstado);

module.exports = router;


const express = require('express');
const router = express.Router();
const prioridadController = require('../controllers/prioridad_controller');

router.get('/', prioridadController.listPrioridades);

module.exports = router;

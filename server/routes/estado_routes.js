
const express = require('express');
const router = express.Router();
const estadoController = require('../controllers/estado_controller');

router.get('/', estadoController.listEstados);

module.exports = router;

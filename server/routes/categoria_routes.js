
const express = require('express');
const router = express.Router();
const categoriaController = require('../controllers/categoria_controller');

router.get('/', categoriaController.listCategorias);
router.post('/add', categoriaController.addCategoria);
router.get('/:id', categoriaController.getCategoriaById);
router.put('/edit/:id', categoriaController.editCategoria);
router.delete('/delete/:id', categoriaController.deleteCategoria);

module.exports = router;

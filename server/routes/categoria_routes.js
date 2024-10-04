
import { Router } from 'express';
const router = Router();
import { listCategorias, addCategoria, getCategoriaById, editCategoria, deleteCategoria } from '../controllers/categoria_controller';

router.get('/', listCategorias);
router.post('/add', addCategoria);
router.get('/:id', getCategoriaById);
router.put('/edit/:id', editCategoria);
router.delete('/delete/:id', deleteCategoria);

export default router;

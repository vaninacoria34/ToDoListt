
import { Router } from 'express';
const router = Router();
import { listEstados, addEstado, getEstadoById, editEstado, deleteEstado } from '../controllers/estado_controller';

router.get('/', listEstados);
router.post('/add', addEstado);
router.get('/:id', getEstadoById);
router.put('/edit/:id', editEstado);
router.delete('/delete/:id', deleteEstado);

export default router;

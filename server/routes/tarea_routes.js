
import { Router } from 'express';
const router = Router();
import { listTareas, addTarea, getTareaById, editTarea, deleteTarea } from '../controllers/tarea_controller';

// Rutas para Tareas
router.get('/', listTareas);
router.post('/add', addTarea);
router.get('/:id', getTareaById);
router.put('/edit/:id', editTarea);
router.delete('/delete/:id', deleteTarea);

export default router;


import { Router } from 'express';
const router = Router();
import { listPrioridades } from '../controllers/prioridad_controller';

router.get('/', listPrioridades);

export default router;

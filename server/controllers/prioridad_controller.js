
import { query } from '../database';

// Listar todos los estados
export async function listPrioridades(res) {
    try {
        const prioridades = query('SELECT * FROM Prioridad');
        if (prioridades && prioridades.length === 0) {
            res.status(404).json({ message: 'No hay prioridades registradas' });
        } else {
            res.json(prioridades);
        };
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error al listar las prioridades' });
    }
}
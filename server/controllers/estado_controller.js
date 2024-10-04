
const pool = require('../database');

// Listar todos los estados
exports.listEstados = async (req, res) => {
    try {
        const estados = pool.query('SELECT * FROM Estado');
        if (estados && estados.length === 0) {
            res.status(404).json({ message: 'No hay estados registrados' });
        } else {
            res.json(estados);
        };
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error al listar estados' });
    }
};

// Agregar un nuevo estado
exports.addEstado = async (req, res) => {
    const { nombre } = req.body;
    try {
        const nuevoEstado = { nombre };

        // Validar que el nombre del estado no esté vacío
        if (!nombre) {
            res.status(400).json({ message: 'El nombre del estado es requerido' });
        }
        
        // Verificar si el estado ya existe
        const [estado] = await pool.query('SELECT * FROM Estado WHERE nombre = ?', [nombre]);
        if (estado) {
            res.status(400).json({ message: 'El estado ya existe' });
        }

        await pool.query('INSERT INTO Estado SET ?', [nuevoEstado]);
        if (nuevoEstado.affectedRows === 0) {
            res.json({ message: 'Error al agregar estado' });
        } else {
            res.json({ message: 'Estado agregado correctamente' });
        };
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error al agregar estado' });
    }
};

// Obtener un estado por su ID
exports.getEstadoById = async (req, res) => {
    const { id } = req.params;
    try {
        const estado = await pool.query('SELECT * FROM Estado WHERE PK_Estado = ?', [id]);

        if (estado.length === 0) {
            res.json({ message: 'Categoría no encontrada' });
        } else {
            res.json(estado[0]);
        };
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error al obtener el estado' });
    }
};

// Editar un estado
exports.editEstado = async (req, res) => {
    const { id } = req.params;
    const { nombre } = req.body;
    try {
        const nuevoEstado = { nombre };

        // Validar que el nombre del estado no esté vacío
        if (!nombre) {
            res.status(400).json({ message: 'El nombre del estado es requerido' });
        }

        // Verificar si el estado ya existe
        const [estado] = await pool.query('SELECT * FROM Estado WHERE nombre = ?', [nuevoEstado]);
        if (estado) {
            res.status(400).json({ message: 'El estado ya existe' });
        }

        await pool.query('UPDATE Estado SET ? WHERE PK_Estado = ?', [nuevoEstado, id]);
        if (nuevoEstado.affectedRows === 0) {
            res.json({ message: 'Estado no encontrado' });
        } else {
            res.json({ message: 'Estado actualizado correctamente' });
        };
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error al actualizar estado' });
    }
};

// Eliminar un estado
exports.deleteEstado = async (req, res) => {
    const { id } = req.params;
    try {
        // Verificar si hay tareas asociadas al estado
        const [tareas] = await pool.query('SELECT * FROM Tarea WHERE FK_Estado = ?', [id]);

        if (tareas && tareas.length > 0) {
            res.status(400).json({ message: 'No se puede eliminar el estado porque tiene tareas asociadas' });
        }

        // Si no hay tareas asociadas, eliminar el estado
        const estado = await pool.query('DELETE FROM Estado WHERE PK_Estado = ?', [id]);
        if (estado.affectedRows === 0) {
            res.json({ message: 'Estado no encontrado' });
        } else {
            res.json({ message: 'Estado eliminado correctamente' });
        };
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error al eliminar estado' });
    }
};

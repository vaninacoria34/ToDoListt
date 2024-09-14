
const pool = require('../database');

// Listar todas las categorías
exports.listCategorias = async (req, res) => {
    try {
        const categorias = await pool.query('SELECT * FROM Categoria');
        if (categorias.length === 0) {
            res.status(404).json({ message: 'No hay categorías registradas' });
        } else {
            res.json(categorias);
        };
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error al listar categorías' });
    }
};

// Agregar una nueva categoría
exports.addCategoria = async (req, res) => {
    const { nombre } = req.body;
    try {
        const nuevaCategoria = { nombre };

        // Validar que el nombre de la categoría no esté vacío
        if (!nombre) {
            res.status(400).json({ message: 'El nombre de la categoría es requerido' });
        }
        
        // Verificar si la categoría ya existe
        const [categoria] = await pool.query('SELECT * FROM Categoria WHERE nombre = ?', [nombre]);
        if (categoria) {
            res.status(400).json({ message: 'La categoría ya existe' });
        }

        await pool.query('INSERT INTO Categoria SET ?', [nuevaCategoria]);
        if (nuevaCategoria.affectedRows === 0) {
            res.json({ message: 'Error al agregar categoría' });
        } else {
            res.json({ message: 'Categoría agregada correctamente' });
        };
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error al agregar categoría' });
    }
};

// Obtener una categoría por su ID
exports.getCategoriaById = async (req, res) => {
    const { id } = req.params;
    try {
        const categoria = await pool.query('SELECT * FROM Categoria WHERE PK_Categoria = ?', [id]);

        if (categoria.length === 0) {
            res.json({ message: 'Categoría no encontrada' });
        } else {
            res.json(categoria[0]);
        };
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error al obtener la categoría' });
    }
};

// Editar una categoría
exports.editCategoria = async (req, res) => {
    const { id } = req.params;
    const { nombre } = req.body;
    try {
        const nuevaCategoria = { nombre };

        // Validar que el nombre de la categoría no esté vacío
        if (!nombre) {
            res.status(400).json({ message: 'El nombre de la categoría es requerido' });
        }

        // Verificar si la categoría ya existe
        const [categoria] = await pool.query('SELECT * FROM Categoria WHERE nombre = ?', [nuevaCategoria]);
        if (categoria) {
            res.status(400).json({ message: 'La categoría ya existe' });
        }

        await pool.query('UPDATE Categoria SET ? WHERE PK_Categoria = ?', [nuevaCategoria, id]);
        if (nuevaCategoria.affectedRows === 0) {
            res.json({ message: 'Categoría no encontrada' });
        } else {
            res.json({ message: 'Categoría actualizada correctamente' });
        };
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error al actualizar categoría' });
    }
};

// Eliminar una categoría
exports.deleteCategoria = async (req, res) => {
    const { id } = req.params;
    try {
        // Verificar si hay tareas asociadas a la categoría
        const [tareas] = await pool.query('SELECT * FROM Tarea WHERE FK_Categoria = ?', [id]);

        if (tareas && tareas.length > 0) {
            res.status(400).json({ message: 'No se puede eliminar la categoría porque tiene tareas asociadas' });
        }

        // Si no hay tareas asociadas, eliminar la categoría
        const categoria = await pool.query('DELETE FROM Categoria WHERE PK_Categoria = ?', [id]);
        if (categoria.affectedRows === 0) {
            res.json({ message: 'Categoría no encontrada' });
        } else {
            res.json({ message: 'Categoría eliminada correctamente' });
        };
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error al eliminar categoría' });
    }
};


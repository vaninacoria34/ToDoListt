
const pool = require('../database');

// Listar todos los estados
exports.listEstados = async (req, res) => {
    try {
        const estados = await pool.query('SELECT * FROM Estado');
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
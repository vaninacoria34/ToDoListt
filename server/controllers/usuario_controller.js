const pool = require('../database');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// Registrar un nuevo usuario
exports.registrarUsuario = async (req, res) => {
    const { nombre, apellido, email, password } = req.body;

    // Validar que los campos no estén vacíos
    if (!nombre || !apellido || !email || !password) {
        return res.status(400).json({ message: 'Todos los campos son requeridos' });
    }

    try {
        // Verificar si el usuario ya existe
        const [usuarioExistente] = await pool.query('SELECT * FROM Usuario WHERE email = ?', [email]);
        
        // Verifica que usuarioExistente sea un array antes de acceder a su longitud
        if (usuarioExistente && usuarioExistente.length > 0) {
            return res.status(400).json({ message: 'El usuario ya existe' });
        }

        // Hashear la contraseña
        const hashedPassword = await bcrypt.hash(password, 10);

        // Insertar el nuevo usuario
        const nuevoUsuario = { nombre, apellido, email, password: hashedPassword };
        const resultado = await pool.query('INSERT INTO Usuario SET ?', [nuevoUsuario]);

        if (resultado.affectedRows === 0) {
            return res.status(500).json({ message: 'Error al registrar el usuario' });
        }

        res.status(201).json({ message: 'Usuario registrado exitosamente' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error al registrar el usuario' });
    }
};

// Iniciar sesión de un usuario
exports.loginUsuario = async (req, res) => {
    const { email, password } = req.body;

    // Log para verificar qué datos llegan del cliente
    console.log('Datos recibidos:', { email, password });

    try {
        // Buscar el usuario en la base de datos
        const [usuario] = await pool.query('SELECT * FROM Usuario WHERE email = ?', [email]);

        // Verifica si el usuario existe
        console.log('Usuario encontrado:', usuario); // Log del usuario encontrado
        if (!usuario) {
            return res.status(401).json({ message: 'Credenciales inválidas' });
        }

        // Comparar la contraseña
        const isPasswordValid = await bcrypt.compare(password, usuario.password); // Cambia usuario[0] a usuario
        if (!isPasswordValid) {
            return res.status(401).json({ message: 'Credenciales inválidas' });
        }

        // Generar un token JWT
        const token = jwt.sign({ userId: usuario.PK_Usuario }, 'Vani_Vale_Gero', { expiresIn: '1h' });

        res.status(200).json({
            message: 'Inicio de sesión exitoso',
            token: token,
            userId: usuario.PK_Usuario,
            nombre: usuario.nombre,
            apellido: usuario.apellido
        });
    } catch (error) {
        console.error('Error al iniciar sesión:', error); // Log del error
        res.status(500).json({ message: 'Error al iniciar sesión' });
    }
};

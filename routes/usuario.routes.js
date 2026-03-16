const express = require('express');
const router = express.Router();
const usuarioController = require('../controllers/usuario.controller');

// Rutas CRUD para Curso
router.get('/', usuarioController.listarUsuarios);           // Obtener todos
router.get('/:id', usuarioController.obtenerUsuario);        // Obtener uno por ID
router.post('/', usuarioController.crearUsuario);            // Crear nuevo
router.put('/:id', usuarioController.actualizarUsuario);     // Actualizar por ID
router.delete('/:id', usuarioController.eliminarUsuario);    // Eliminar por ID

module.exports = router;

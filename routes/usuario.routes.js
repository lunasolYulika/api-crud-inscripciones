const express = require('express');
const router = express.Router();
const usuarioController = require('../controllers/usuario.controller');

// Rutas CRUD para Curso
router.get('/', usuarioController.listarUsuarios);           // Obtener todos
router.get('/:id', usuarioController.obtenerUsuario);        // Obtener uno por ID

//el alta es el q usa el validador de datos
const {reglasAltaUsuario,reglasActualizar, reglasEliminar} = require('../validators/usuario.validator');
// enchufo el middleware validador
router.post('/', reglasAltaUsuario, usuarioController.crearUsuario);            // Crear nuevo
router.put('/:id', reglasActualizar, usuarioController.actualizarUsuario);     // Actualizar por ID
router.delete('/:id',reglasEliminar, usuarioController.eliminarUsuario);    // Eliminar por ID

module.exports = router;

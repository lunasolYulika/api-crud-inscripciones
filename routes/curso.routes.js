const express = require('express');
const router = express.Router();
const cursoController = require('../controllers/curso.controller');

// Rutas CRUD para Curso
router.get('/', cursoController.listarCursos);           // Obtener todos
router.get('/:id', cursoController.obtenerCurso);        // Obtener uno por ID

const {reglasCurso} = require('../validators/curso.validator');
router.post('/',reglasCurso, cursoController.crearCurso);            // Crear nuevo

router.put('/:id', cursoController.actualizarCurso);     // Actualizar por ID
router.delete('/:id', cursoController.eliminarCurso);    // Eliminar por ID

module.exports = router;

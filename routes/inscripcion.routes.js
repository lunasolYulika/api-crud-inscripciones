const express = require('express');
const router = express.Router();
const inscripcionControlador = require('../controllers/inscripcion.controller');

router.post('/', inscripcionControlador.crearInscripcion);
router.get('/', inscripcionControlador.listarInscripciones);
router.delete('/:id', inscripcionControlador.eliminarInscripcion);
router.get('/:id', inscripcionControlador.buscarInscripcion);
router.get('/curso/:cursoId', inscripcionControlador.obtenerInscriptosPorCurso); // ✅ Agregar esta ruta


module.exports = router;

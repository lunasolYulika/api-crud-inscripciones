const express = require('express');
const router = express.Router();
const inscripcionControlador = require('../controllers/inscripcion.controller');

const {reglasInscripcion} = require('../validators/inscripcion.validator');
router.post('/',reglasInscripcion, inscripcionControlador.crearInscripcion);
router.get('/', inscripcionControlador.listarInscripciones);
router.delete('/:id', inscripcionControlador.eliminarInscripcion);
router.get('/:id', inscripcionControlador.buscarInscripcion);
router.get('/curso/:cursoId', inscripcionControlador.obtenerInscriptosPorCurso); // 


module.exports = router;

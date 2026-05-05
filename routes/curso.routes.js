const express = require('express');
const router = express.Router();
const cursoController = require('../controllers/curso.controller');
const {verificarToken, soloAdmin} = require('../middleware/auth.middleware')

//RUTAS PUBLICAS:
router.get('/', cursoController.listarCursos);           // Obtener todos
router.get('/:id', cursoController.obtenerCurso);        // Obtener uno por ID

//RUTAS PROTEGIDAS
const {reglasCurso} = require('../validators/curso.validator');
router.post('/',verificarToken, reglasCurso, cursoController.crearCurso);            // Crear nuevo
router.put('/:id', verificarToken,cursoController.actualizarCurso);     // Actualizar por ID

//RUTA SOLO ADMIN
router.delete('/:id', verificarToken,soloAdmin,cursoController.eliminarCurso);    // Eliminar por ID

module.exports = router;

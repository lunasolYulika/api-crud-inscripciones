const Inscripcion = require("../models/inscripcion.model")
const Curso = require("../models/curso.model")
const mongoose = require("mongoose")

exports.crearInscripcion = async (req,res) =>{
    try{
        const {usuarioId,cursoId} = req.body;
        //BUSCAR curso
        console.log( "LOG datos recibidos: "+ { usuarioId, cursoId });
        const curso = await Curso.findById(cursoId)        
        if (!curso) return res.status(404).json({error: "Curso no encontrado"});

        // VALIDAR cant inscriptos para este curso
        const inscriptos = await Inscripcion.countDocuments({
            curso: cursoId
        });

        if (inscriptos >= curso.cupoMax) return res.status(400).json({error:'No hay cupo disponible'});

        // CREAR inscripcion
        const inscripcion = await Inscripcion.create({
            usuario: usuarioId,
            curso: cursoId
        });

        res.status(201).json(inscripcion)

    }catch(error){
        if (error.code === 11000) return res.status(409).json({error:'El alumno ya esta inscripto a este curso'});
        res.status(400).json({error:error.message});
    }
};

// LISTAR todas las inscripciones
exports.listarInscripciones = async (req, res) => {
  try {
    const inscripciones = await Inscripcion.find()
              .populate('usuario')
              .populate('curso');

    res.json(inscripciones);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// ELIMINAR inscripción
exports.eliminarInscripcion = async (req, res) => {
  try {
    const inscripcion = await Inscripcion.findByIdAndDelete(req.params.id);
    if (!inscripcion) {
      return res.status(404).json({ error: 'Inscripción no encontrada' });
    }

    res.json({ mensaje: 'Inscripción eliminada' });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// BUSCAR INSCRIPCION
exports.buscarInscripcion = async (req,res) => {
  try{
    const inscripcion = await Inscripcion.findById(req.params.id)
      .populate('usuario')
      .populate('curso');

    if (!inscripcion) {
      return res.status(404).json({ error: 'Inscripción no encontrada' });
    }

    res.json(inscripcion);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// OBTENER inscrpitos por curso
exports.obtenerInscriptosPorCurso = async (req, res) => {
  try {
    const cursoId = req.params.cursoId;
    
    if (!mongoose.Types.ObjectId.isValid(cursoId)){
      return res.status(400).json({ error: 'ID inválido' });
    }      
    
    // Buscar todas las inscripciones para este curso y popular el usuario
    const inscripciones = await Inscripcion.find({ curso: cursoId })
      .populate('usuario')
      .populate('curso');
    
    // Extraer solo los usuarios
    const usuarios = inscripciones.map(inscr => inscr.usuario);
    console.log(`Server: se extrajeron:  ${usuarios}`)
    res.json(usuarios);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
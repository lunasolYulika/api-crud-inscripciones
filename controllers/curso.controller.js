const Curso = require('../models/curso.model');

// Crear un curso
exports.crearCurso = async (req, res) => {
  try {
    const curso = await Curso.create(req.body);
    res.status(201).json(curso);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Listar todos los cursos
exports.listarCursos = async (req, res) => {
  try {
    const cursos = await Curso.find();
    res.json(cursos);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Obtener un curso por ID (Mongo _id)
exports.obtenerCurso = async (req, res) => {
  try {
    const curso = await Curso.findById(req.params.id);
    if (!curso) return res.status(404).json({ error: "Curso no encontrado" });

    res.json(curso);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Actualizar un curso
exports.actualizarCurso = async (req, res) => {
  try {
    console.log(req.body)
    const curso = await Curso.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true } 
    );

    if (!curso) return res.status(404).json({ error: "Curso no encontrado" });
    console.log("Curso encontrado " + curso.nombre)
    res.json(curso);
    return
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Eliminar un curso
exports.eliminarCurso = async (req, res) => {
  try {
    const curso = await Curso.findByIdAndDelete(req.params.id);
    if (!curso) return res.status(404).json({ error: "Curso no encontrado" });

    res.json({ mensaje: "Curso eliminado" });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

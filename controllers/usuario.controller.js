const Usuario = require('../models/usuario.model');

// Crear un curso
exports.crearUsuario = async (req, res) => {
  try {
    const usuario = await Usuario.create(req.body);
    res.status(201).json(usuario);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Listar todos los cursos
exports.listarUsuarios = async (req, res) => {
  try {
    const usuarios = await Usuario.find();
    res.json(usuarios);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Obtener un u por ID (Mongo _id)
exports.obtenerUsuario = async (req, res) => {
  try {
    const usuario = await Usuario.findById(req.params.id);
    if (!usuario) return res.status(404).json({ error: "Usuario no encontrado" });

    res.json(usuario);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Actualizar un curso
exports.actualizarUsuario = async (req, res) => {
  try {
      const usuario = await Usuario.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true } /*
      dicc parámetro de findByIdAndUpdate().
            Define cómo debe comportarse la actualización.
            1. new: true ->            Devuelve el documento ACTUALIZADO, no el viejo.Sin esto, te devuelve el documento antes del update.
            2. runValidators: true -> Activa las validaciones del schema al actualizar. Mongoose por defecto NO valida los updates (solo los creates).
                Con esto, valida: tipos, required, unique, longitudes, regex, etc. / evita guardar datos inválidos
*/
        );

    if (!usuario) return res.status(404).json({ error: "Usuario no encontrado" });
    console.log("Usuario encontrado " + usuario.dni)
    res.json(usuario);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Eliminar un curso
exports.eliminarUsuario = async (req, res) => {
  try {
    const usuario = await Usuario.findByIdAndDelete(req.params.id);
    if (!usuario) return res.status(404).json({ error: "Usuario no encontrado" });

    res.json({ mensaje: "Usuario eliminado" });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

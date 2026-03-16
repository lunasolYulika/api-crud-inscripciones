const mongoose = require('mongoose');

const InscripcionEsquema = new mongoose.Schema(
  {
    usuario: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Usuario', //para mongoose y q entienda q es un doc de la colecc Usuario, ademas sirve para usar populate()
      required: true
    },
    curso: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Curso',
      required: true
    },
    fechaInscripcion: {
      type: Date,
      default: Date.now
    }
  },
  {
    timestamps: true
  }
);

//creacion indice compuesto p evitar dupl (E11000 duplicate key error)
InscripcionEsquema.index(
  { usuario: 1, curso: 1 },
  { unique: true }
);

const Inscripcion = mongoose.model('Inscripcion', InscripcionEsquema);
module.exports = Inscripcion;

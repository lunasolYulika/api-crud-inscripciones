const mongoose = require('mongoose')

const CursoEsquema = new mongoose.Schema({
        curso: { type: String, required: true , unique: true},
        cupoMax: { type: Number, required: true}
    },
    {
        timestamps: true   // ← esto agrega createdAt y updatedAt , son configuraucion de cada esquema 
    }
)

// conviene usar el exoprt para que se exporta una sola cosa CursoEsquema
const Curso = mongoose.model('Curso', CursoEsquema);
module.exports = Curso;

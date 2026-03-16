const mongoose = require('mongoose')

const UsuarioEsquema = new mongoose.Schema({
        dni: { type: Number, required: true, unique: true },
        nombre: { type: String, required: true }
    }, 
    {
        timestamps: true   // ← esto agrega createdAt y updatedAt , son configuraucion de cada esquema 
    }
)

const Usuario = mongoose.model('Usuario', UsuarioEsquema);
module.exports = Usuario;
 
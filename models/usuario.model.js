const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')


const UsuarioEsquema = new mongoose.Schema({
        dni: { type: Number, required: true, unique: true },
        nombre: { type: String, required: true },
        email: {type: String, required: true, unique:true, lowercase: true, trim:true},
        password: {type:String, required:true, minlength:6},
        rol:{type:String, enum: ['usuario','admin'] , default:'usuario'}

    }, 
    {
        timestamps: true   // ← esto agrega createdAt y updatedAt , son configuraucion de cada esquema 
    }
)
// Hook pre-save: hashea la contrasena automaticamente antes de guardar
UsuarioEsquema.pre('save',async function(){
    //solo hashea si la pasw fue modif
    if (!this.isModified('password')) return;

    const salt = await bcrypt.genSalt(10)
    this.password = await bcrypt.hash(this.password,salt)
    
});

//método comparación passw
UsuarioEsquema.methods.compararPassword = async function(passwordIngresada){
    return await bcrypt.compare(passwordIngresada,this.password)
};


const Usuario = mongoose.model('Usuario', UsuarioEsquema);
module.exports = Usuario;
 
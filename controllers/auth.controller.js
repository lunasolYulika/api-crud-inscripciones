const Usuario = require("../models/usuario.model")
const jwt = require("jsonwebtoken")
const bcrypt = require('bcryptjs')

exports.registro = async (req,res) =>{
    try{
        const {dni,nombre,email,password} = req.body

        //ver si existe email
        const existe = await Usuario.findOne({email})

        if (existe)
            return res.status(400).json({error:"El email ya esta registrado."})

        //creacion usuario
        const usuario = new Usuario({dni,nombre,email,password})
        await usuario.save()

        res.status(201).json({mensaje:"Usuario registrado correctamente"})
    }catch(error){
        console.error('[auth] Error en el registro: ', error.message)
        res.status(500).json({error: "Error al registrar el nuevo usuario"})
    }
};

exports.login = async (req,res) =>{
    try{
        const {email,password} = req.body

        const usuarioEncontrado = await Usuario.findOne({email})

        if (!usuarioEncontrado){
            res.status(401).json({error: "Credenciales incorrectas"})
        }

        //comparacion

        const esValida = await usuarioEncontrado.compararPassword(password)
        if (!esValida)
            res.status(401).json({error: "Credenciales incorrectas"})

        //generar token jwt
        const token = jwt.sign(
            {userID: usuarioEncontrado._id, rol: usuarioEncontrado.rol }, //payload
            process.env.JWT_SECRET,     // clave secreta
            {expiresIn:'24h'}           // EXpira en 2h
        )

        res.json({
            token,
            usuario: {
                id: usuarioEncontrado.id,
                dni: usuarioEncontrado.dni,
                nombre: usuarioEncontrado.nombre,
                rol: usuarioEncontrado.rol       
            }
        })
    }catch(error){
        console.error('[auth] Error en login:', error.message);
        res.status(500).json({mensaje: "Error al iniciar sesion"})
    }

    


}
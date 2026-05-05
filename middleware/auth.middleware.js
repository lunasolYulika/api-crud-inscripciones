const jwt = require("jsonwebtoken")

const verificarToken = (req,res,next)=>{
    //leer header auth
    const authHeader = req.headers['authorization']

    //se espera header en formato bearer token
    if (!authHeader || !authHeader.startsWith('Bearer '))
        return res.status(401).json({error:"token requerido"})

    //extraccion token
    const token = authHeader.split(' ')[1];

    try{
        //verif y deco token
        const decoded = jwt.verify(token, process.env.JWT_SECRET)

        //agregar datos de user al usuario del rq para usarlo en el controller

        req.usuario = decoded
        next() // dejar pasar al controller


    }catch(error){
           // jwt.verify lanza error si el token es invalido o expiro
        return res.status(401).json({ error: 'Token invalido o expirado' });
 
    }
}

// Agregar en el mismo archivo middlewares/auth.middleware.js

const soloAdmin = (req, res, next) => {
  if (req.usuario.rol !== 'admin') {
    return res.status(403).json({ error: 'Acceso restringido a administradores' });
  }
  next();
};


module.exports = {verificarToken,soloAdmin}
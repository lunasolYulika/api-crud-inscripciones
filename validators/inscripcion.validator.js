const {body, validationResult} = require ('express-validator')

// reglas de validación
const reglasInscripcion = [
    body('usuario') // nombres del modelo 
        .notEmpty().withMessage('El id del usuario es requerido')        
        .isMongoId().withMessage('El id del usuario es no válido'),
    body('curso')// nombres del modelo 
        .notEmpty().withMessage('El cupo es requerido')
        .isMongoId().withMessage('El id del curso es no válido'),
        
    
        //Middleware que evalúa las reglas ycorta si hay errores
        (req,res,next) =>{
            const errores = validationResult(req);
            if (!errores.isEmpty()){
                return res.status(400).json({errores:errores.array()});
            }
            next(); // validaciones aprobadas, redireccionamiento al controller
        }
];
module.exports = {reglasInscripcion};
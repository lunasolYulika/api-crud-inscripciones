const {body, validationResult} = require ('express-validator')

// reglas de validación
const reglasCurso = [
    body('curso') // nombres del modelo 
        .notEmpty().withMessage('El nombre del curso es requerido')        
        .isLength({min:3,max:60}).withMessage('El nombre del curso debe tener 7/8 caracteres'),
    body('cupoMax')// nombres del modelo 
        .notEmpty().withMessage('El cupo es requerido')
        .isNumeric().withMessage('El cupo debe ser numérico')
        .isLength({min:2}).withMessage('El cupo debe ser mayor a 1'),
    
        //Middleware que evalúa las reglas ycorta si hay errores
        (req,res,next) =>{
            const errores = validationResult(req);
            if (!errores.isEmpty()){
                return res.status(400).json({errores:errores.array()});
            }
            next(); // validaciones aprobadas, redireccionamiento al controller
        }
];
module.exports = {reglasCurso};
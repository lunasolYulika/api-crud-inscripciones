const {body, param, validationResult} = require ('express-validator')

console.log("NGRESADO A VALIDACION ***********")

//Middleware que evalúa las reglas ycorta si hay errores
const evaluarRegla = (req,res,next) => {
    const errores = validationResult(req);
    if (!errores.isEmpty()){
        return res.status(400).json({errores:errores.array()});
    }
    next(); // validaciones aprobadas, redireccionamiento al controller
}

// reglas de validación0 
const reglasAltaUsuario = [
    body('dni')
        .notEmpty().withMessage('El DNI es requerido')
        .isNumeric().withMessage('El DNI debe ser numérico')
        .isLength({min:7,max:8}).withMessage('El DNI debe tener 7/8 dígitos'),
    body('nombre')
        .notEmpty().withMessage('El nombre es requerido')
        .isString().withMessage('El nomobre debe ser texto')
        .isLength({min:2,max:60}).withMessage('El nombre debe tener entre 2  y 60 caracteres'),
    
    evaluarRegla
];

const reglasActualizar = [
    param('id')
        .notEmpty().withMessage('El ID es requerido')
        .isMongoId().withMessage('El ID no es válido'),
    body('dni')
        .notEmpty().withMessage('El DNI es requerido')
        .isNumeric().withMessage('El DNI debe ser numérico')
        .isLength({ min: 7, max: 8 }).withMessage('El DNI debe tener 7/8 dígitos'),
    body('nombre')
        .notEmpty().withMessage('El nombre es requerido')
        .isString()
        .isLength({ min: 2, max: 60 }).withMessage('Entre 2 y 60 caracteres'),
    evaluarRegla
];

// DELETE - solo validar el ID
const reglasEliminar = [
    param('id')
        .notEmpty().withMessage('El ID es requerido')
        .isMongoId().withMessage('El ID no es válido'),
    evaluarRegla
];

module.exports = {reglasAltaUsuario,reglasActualizar,reglasEliminar};
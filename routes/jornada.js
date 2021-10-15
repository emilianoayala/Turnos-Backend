const { Router } = require("express");
const { newJornada } = require("../controllers/jornada");
const { check } =require('express-validator');
const { validarCampos } = require('../middlewares/validar-campos');
const router = Router();


router.post("/newJornada",

[  
    // check('tipoJornada', 'El tipo es obligatorio').not().isEmpty(),
    // check('fechaInicio', 'La fecha de inicio es obligatoria').not().isEmpty(),
    // check('fechaFin', 'La fecha de finalizacion es obligatoria').not().isEmpty(),
    // validarCampos

],
 newJornada);


module.exports = router
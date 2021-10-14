const { Router } = require("express");
const { check } =require('express-validator');
const { newTipoJornada } = require("../controllers/tipoJornada");
const { validarCampos } = require('../middlewares/validar-campos');
const router = Router();


router.post("/newTipoJornada",

 [  
     check('tipoJornada', 'Campo obligatorio').not().isEmpty(),
     validarCampos

 ],
  newTipoJornada);




module.exports = router;
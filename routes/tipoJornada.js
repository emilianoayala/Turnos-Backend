const { Router } = require("express");
const { check } =require('express-validator');
const { newTipoJornada, getTipos } = require("../controllers/tipoJornada");
const { validarCampos } = require('../middlewares/validar-campos');
const router = Router();


router.post("/newTipoJornada",

 [  
     check('tipoJornada', 'Campo obligatorio').not().isEmpty(),
     validarCampos

 ],
  newTipoJornada);

  router.get("/getTipos",

 [  
     check('tipos', 'Campo obligatorio').not().isEmpty(),
     validarCampos

 ],
  getTipos);




module.exports = router;
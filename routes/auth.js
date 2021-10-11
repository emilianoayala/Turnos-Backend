// Rutas de usuario
// host + /api/auth

const { Router } = require("express");
const { check } =require('express-validator')
const { validarCampos } = require('../middlewares/validar-campos');
const { crearUsuario, loginUsuario } = require("../controllers/auth");
const router = Router();


router.post("/newUser",

 [  
     check('userName', 'El nombre es obligatorio').not().isEmpty(),
     check('email', 'El email es obligatorio').isEmail(),
     check('password', 'El password debe contener 4 caracteres minimo').isLength( {min: 4}),
     validarCampos

 ],
  crearUsuario);

router.post("/login",
[  
  check('userName', 'El nombre es obligatorio').not().isEmpty(),
  check('password', 'El password debe contener 4 caracteres minimo').isLength( {min: 4}),
  validarCampos

],
 loginUsuario);

module.exports = router;

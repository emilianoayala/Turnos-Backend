// Rutas de usuario
// host + /api/auth


const { Router } = require('express');
const router = Router();

const { crearUsuario, loginUsuario } =require('../controllers/auth');

router.post('/newUser', crearUsuario );

router.post('/login', loginUsuario );

module.exports = router;

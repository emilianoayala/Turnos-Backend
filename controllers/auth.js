const { response } = require('express');





const crearUsuario = (req, res = response)=>{

    const { userName, email, password, passwordConfirm } = req.body;


    res.status(201).json({
        ok:true,
        msg:'Nuevo Usuario',
        userName,
        email,
        password,
        passwordConfirm
        
    })
}

const loginUsuario = ( req, res = response)=>{

    const { userName, password } = req.body;

    

    res.json({
        ok:true,
        msg:'login',
        userName,
        password
    })
}



module.exports = {
    crearUsuario,
    loginUsuario
}
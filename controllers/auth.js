const { response } = require('express');
const Usuario =require('../models/Usuario');




const crearUsuario = async(req, res = response)=>{

    // const { userName, email, password, passwordConfirm } = req.body;

    try {
        const usuario = new Usuario( req.body);

    await usuario.save();


    res.status(201).json({
        ok:true,
        msg:'Nuevo Usuario',
       
        
    })
        
    } catch (error) {
        console.log(error)
        res.status(500).json({
            ok:false,
            msg:'Hablar con el Admin'
        });
    }

    
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
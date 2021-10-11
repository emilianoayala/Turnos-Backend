const { response } = require('express');
const bcrypt = require('bcryptjs');
const Usuario =require('../models/Usuario');




const crearUsuario = async(req, res = response)=>{

    const { userName, email, password, passwordConfirm } = req.body;

    try {
        let usuario = await Usuario.findOne({ email });
        
        if (usuario) {
            return res.status(400).json({
                ok:false,
                msg:'Correo ya utilizado'
            });
        }


      usuario = new Usuario( req.body);

    //   Encriptado de password 
        const salt = bcrypt.genSaltSync();
        usuario.password = bcrypt.hashSync( password, salt);


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
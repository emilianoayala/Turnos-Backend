const { response } = require('express');
const bcrypt = require('bcryptjs');
const Usuario =require('../models/Usuario');
const { generarJWT }= require('../helpers/token');




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

    // generar JWT
    const token = await generarJWT(usuario.id, userName);



    res.status(201).json({
        ok:true,
        msg:'Nuevo Usuario',
        uid: usuario.id,
        userName,
        token
       
        
    })
        
    } catch (error) {
        console.log(error)
        res.status(500).json({
            ok:false,
            msg:'Hablar con el Admin'
        });
    }

    
}

const loginUsuario =async ( req, res = response)=>{

    const { userName, password } = req.body;

    try {
        let usuario = await Usuario.findOne({ userName });
        
        if (!usuario) {
            return res.status(400).json({
                ok:false,
                msg:'Usuario invalido'
            });
        }

        // confirmar los passwords
        const validPassword = bcrypt.compareSync(password, usuario.password);

        if (!validPassword) {
            return res.status(400).json({
                ok:false,
                msg:'Contraseña invalida.'
            });
        }

        // Generar nuestro Jason Web Token (JWT)
        const token = await generarJWT(userName, password);

        res.json({
            ok: true,
            uid: usuario.id,
            userName: usuario.userName,
            email: usuario.email,
            isAdmin: usuario?.isAdmin,
            token
            
        })

    } catch (error) {
        console.log(error)
        res.status(500).json({
            ok:false,
            msg:'Hablar con el Admin'
        });
    }

    

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
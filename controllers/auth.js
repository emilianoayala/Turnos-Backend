const { response } = require('express');




const crearUsuario = (req, res = response)=>{

    res.json({
        ok:true,
        msg:'Nuevo Usuario'
    })
}

const loginUsuario = ( req, res = response)=>{
    res.json({
        ok:true,
        msg:'login'
    })
}



module.exports = {
    crearUsuario,
    loginUsuario
}
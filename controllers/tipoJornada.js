const { response } = require('express');
const TipoJornada =require('../models/TipoJornada');



const newTipoJornada = async(req, res = response)=>{

    const { tipoJornada } = req.body;

    try {
        let Jornada = await TipoJornada.findOne({ tipoJornada });
        
        if (Jornada) {
            return res.status(400).json({
                ok:false,
                msg:'Jornada ya utilizada'
            });
        }


      Jornada = new TipoJornada( req.body);

           // Grabo en la base de datos
      await Jornada.save();



    res.status(201).json({
        ok:true   
    })
        
    } catch (error) {
        console.log(error)
        res.status(500).json({
            ok:false,
            msg:'Error al crear tipo de jornada'
        });
    }

    
}

module.exports={
    newTipoJornada
}

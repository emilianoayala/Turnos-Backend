const { Schema, model} =require('mongoose');

const TipoJornadaSchema = Schema({

    tipoJornada:{
        type: String,
        require: true,
        unique: true
    },



})

module.exports = model('TipoJornada', TipoJornadaSchema);
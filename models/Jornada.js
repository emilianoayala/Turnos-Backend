const { Schema, model} =require('mongoose');


const JornadaSchema = Schema({

    fechaInicio:{
        type: Date,
        required: true
    },

    fechaFin:{
        type: Date,
        required: true
    },

    Usuario:{
        type: Schema.Types.ObjectId,
        ref: 'usuario'
    },

    tipoJornada:{
        type: Schema.Types.ObjectId,
        ref: 'TipoJornada',
        required: true

    }





})

module.exports = model('Jornada', JornadaSchema);
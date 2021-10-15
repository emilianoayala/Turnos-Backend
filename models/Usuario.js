const { Schema, model} =require('mongoose');

const UsuarioSchema = Schema({

    userName:{
        type: String,
        required: true,
        unique: true
    },

    email:{
        type: String,
        required: true,
        unique: true
    },

    password:{
        type: String,
        required: true,
    },

    isAdmin:{
        type: Boolean,
        required: false
    }




})

module.exports = model('Usuario', UsuarioSchema);
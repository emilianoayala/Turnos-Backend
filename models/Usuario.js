const { Schema, model} =require('mongoose');

const UsuarioSchema = Schema({

    userName:{
        type: String,
        require: true,
        unique: true
    },

    email:{
        type: String,
        require: true,
        unique: true
    },

    password:{
        type: String,
        require: true,
    },

    isAdmin:{
        type: Boolean,
        require: false
    }




})

module.exports = model('Usuario', UsuarioSchema);
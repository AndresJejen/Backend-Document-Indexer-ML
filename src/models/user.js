'use strict'

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = Schema({
    name : {type:String, required: true},                //para busqueda WEB
    email: {type:String,unique:true,required: true},                    //General nombre
    password: {type:String ,required: true},                             //Persona u organización
    level: {type:String,required: true,default:'Admin'},
    documentsadded: [{
        type: Schema.Types.ObjectId,
        ref: 'docs' 
    }]
});

module.exports = mongoose.model('user',UserSchema);

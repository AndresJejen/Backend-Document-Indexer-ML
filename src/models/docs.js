'use strict'

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const DocsSchema = Schema({
    titulo : {type:String, unique:true,required: true},                //para busqueda WEB
    name: {type:String,unique:true,required: true},                    //General nombre
    author: {type:String ,required: true},                             //Persona u organización
    mlanguage: {type:String,required: true},
    typedoc: {type:String,required: true},
    wlanguage : {type:String,required: false},
    ilevel : {type:String,required: false},
    flevel : {type:String,required: false},
    date : {type:Date, default:Date.now},
    link : {type:String,unique:true,required: false},
    helper: {
        type : Schema.Types.ObjectId,
        ref: 'user'
    }
});

module.exports = mongoose.model('docs',DocsSchema);

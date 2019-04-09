'use strict'

//Funcionalidad temporal

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ConsultedSchema = Schema({
    doc : {type: Schema.Types.ObjectId, ref: 'docs'},
    user: {type: Schema.Types.ObjectId, ref: 'user'}
},
//constructor
{
    timestamps: true
});

module.exports = mongoose.model('consults',ConsultedSchema);
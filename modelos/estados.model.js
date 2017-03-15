'use strict'
// modelo para guardar los productos en mongo

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let estados = new Schema({
	nombre_estado: String,
	nombre_motivo: String,
},

{
	timestamps: true // fecha de creacion y actualizacion del registro 
});


//definicion del producto en la base de datos
module.exports = mongoose.model('estado',estados);

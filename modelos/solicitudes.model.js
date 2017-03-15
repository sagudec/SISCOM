'use strict'
// modelo para guardar los productos en mongo

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let solicitudes = new Schema({
	usuario_solicitante: String,
	servicio: String,
	estado: String,
	usuario_encargado: String
},

{
	timestamps: true // fecha de creacion y actualizacion del registro 
});


//definicion del producto en la base de datos
module.exports = mongoose.model('solicitudes',solicitudes);

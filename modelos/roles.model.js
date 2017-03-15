'use strict'
// modelo para guardar los productos en mongo

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let roles = new Schema({
	nombre_rol: String,
},
{
	timestamps: true // fecha de creacion y actualizacion del registro 
});


//definicion del producto en la base de datos
module.exports = mongoose.model('roles',roles);

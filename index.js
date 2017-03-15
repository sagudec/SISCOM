'use strict' //para el uso de todas las variables

const express= require('express') //importar express al proyecto
const bodyParser = require('body-parser')
const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/my_database');


// const para definir una variable

const app= express()//crear el servidor
const port = process.env.PORT || 3000

const Motivos = require('./modelos/motivos.model')
const Servicios= require('./modelos/servicios.model')
const Roles= require('./modelos/roles.model')
const Estado= require('./modelos/estados.model')
const Usuarios= require('./modelos/usuarios.model')
const Solicitudes= require('./modelos/solicitudes.model')


app.use(bodyParser.urlencoded({ extended:false}))
app.use(bodyParser.json()) //para permitir peticiones en formato json



//********************************************SERVICIOS****************************************

app.post('/SISCOM/motivos', (req, res)=> {

	// para poder ver el cuerpo de la peticion
	console.log(req.body)
	let newMotivo = Motivos(req.body);
	newMotivo.save(function(error,createdMotivo){
		if (error) throw error;
		if (createdMotivo){
			return res.status(200).json({message: 'EL motivo se ha recibido',
				createdMotivo:createdMotivo});
		}
		return res.status(500).json({message: 'Error desconocido'});
	})
})


// TIPO GET, PARA QUE MUESTRE LOS MOTIVOS

app.get('/SISCOM/motivos', (req, res) => {
	Motivos.find({},function(error,motivos){
		if (error) throw error;	
		return res.status(200).json(motivos)

	})
	

})



// GET PARA UNO ESPECIFICO POR ID
app.get('/SISCOM/motivos/:motivoId', (req, res)=> {
	Motivos.findById(req.params.motivoId, function(error,motivos){
		if (error) throw error;	
		return res.status(200).json(motivos)
})

})


// TIPO PUT, 'use strict'
// modelo para guardar los productos en mongo


app.put('/SISCOM/motivos/:motivoId', (req, res)=> {

	console.log(req.body)
	Motivos.findOneAndUpdate({_id:req.params.motivoId},{$set:req.body},{new:true},function(error,updatedMotivo){
		if (error) throw error;
		if (updatedMotivo){
			return res.status(201).json({message: 'El motivo se ha actualizado',
				updatedMotivo:updatedMotivo});
		}
		return res.status(500).json({message: 'Error desconocido'});
	})

})


// TIPO DELETE

app.delete('/SISCOM/motivos/:motivoId', (req, res) => {

	Motivos.find({_id:req.params.motivoId}).remove().exec(function(error,data){
		if (error) throw error;
		return res.status(200).json({message: 'El motivo se ha eliminado',
			data:data});
	
			return res.status(500).json({message: 'Error desconocido'});
	})
})

app.listen(port,() => {
console.log(`PROYECTO SISCOM corriendo en http://localhost:${port}`)

})
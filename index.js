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

app.post('/SISCOM/servicios', (req, res)=> {

	// para poder ver el cuerpo de la peticion
	console.log(req.body)
	let newServicio = Servicios(req.body);
	newServicio.save(function(error,createdServicio){
		if (error) throw error;
		if (createdServicio){
			return res.status(200).json({message: 'EL servicio se ha recibido',
				createdServicio:createdServicio});
		}
		return res.status(500).json({message: 'Error desconocido'});
	})
})





// TIPO GET, PARA QUE MUESTRE LOS SERVICIOS

app.get('/SISCOM/servicios', (req, res) => {
	Servicios.find({},function(error,servicios){
		if (error) throw error;	
		return res.status(200).json(servicios)

	})
	

})



// GET PARA UNO ESPECIFICO POR ID
app.get('/SISCOM/servicios/:servicioId', (req, res)=> {
	Servicios.findById(req.params.servicioId, function(error,motivos){
		if (error) throw error;	
		return res.status(200).json(servicios)
})

})


// TIPO PUT, 'use strict'
// modelo para guardar los productos en mongo

app.put('/SISCOM/servicios/:servicioId', (req, res)=> {

	console.log(req.body)
	Servicios.findOneAndUpdate({_id:req.params.servicioId},{$set:req.body},{new:true},function(error,updatedServicio){
		if (error) throw error;
		if (updatedServicio){
			return res.status(201).json({message: 'El servicio se ha actualizado',
				updatedServicio:updatedServicio});
		}
		return res.status(500).json({message: 'Error desconocido'});
	})

})


// TIPO DELETE

app.delete('/SISCOM/servicios/:servicioId', (req, res) => {

	Servicios.find({_id:req.params.servicioId}).remove().exec(function(error,data){
		if (error) throw error;
		return res.status(200).json({message: 'El servicio se ha eliminado',
			data:data});
	
			return res.status(500).json({message: 'Error desconocido'});
	})
})

app.listen(port,() => {
console.log(`PROYECTO SISCOM corriendo en http://localhost:${port}`)

})
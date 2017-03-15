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

app.post('/SISCOM/roles', (req, res)=> {

	// para poder ver el cuerpo de la peticion
	console.log(req.body)
	let newRoles = Roles(req.body);
	newRoles.save(function(error,createdRoles){
		if (error) throw error;
		if (createdRoles){
			return res.status(200).json({message: 'EL rol se ha recibido',
				createdRoles:createdRoles});
		}
		return res.status(500).json({message: 'Error desconocido'});
	})
})





// TIPO GET, PARA QUE MUESTRE LOS SERVICIOS

app.get('/SISCOM/roles', (req, res) => {
	Roles.find({},function(error,roles){
		if (error) throw error;	
		return res.status(200).json(roles)

	})
	

})



// GET PARA UNO ESPECIFICO POR ID
app.get('/SISCOM/roles/:rolesId', (req, res)=> {
	Roles.findById(req.params.rolesId, function(error,roles){
		if (error) throw error;	
		return res.status(200).json(roles)
})

})


// TIPO PUT, 'use strict'
// modelo para guardar los productos en mongo

app.put('/SISCOM/roles/:rolesId', (req, res)=> {

	console.log(req.body)
	Roles.findOneAndUpdate({_id:req.params.rolesId},{$set:req.body},{new:true},function(error,updatedRoles){
		if (error) throw error;
		if (updatedRoles){
			return res.status(201).json({message: 'El rol se ha actualizado',
				updatedRoles:updatedRoles});
		}
		return res.status(500).json({message: 'Error desconocido'});
	})

})


// TIPO DELETE

app.delete('/SISCOM/roles/:rolesId', (req, res) => {

	Roles.find({_id:req.params.rolesId}).remove().exec(function(error,data){
		if (error) throw error;
		return res.status(200).json({message: 'El roles se ha eliminado',
			data:data});
	
			return res.status(500).json({message: 'Error desconocido'});
	})
})


app.listen(port,() => {
console.log(`PROYECTO SISCOM corriendo en http://localhost:${port}`)

})
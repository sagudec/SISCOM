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

app.post('/SISCOM/usuarios', (req, res)=> {

	// para poder ver el cuerpo de la peticion
	console.log(req.body)
	let newUsuario = Usuario(req.body);
	newUsuario.save(function(error,createdusuarios){
		if (error) throw error;
		if (createdusuarios){
			return res.status(200).json({message: 'EL usuario se ha recibido',
				createdusuarios:createdusuarios});
		}
		return res.status(500).json({message: 'Error desconocido'});
	})
})





// TIPO GET, PARA QUE MUESTRE LOS SERVICIOS

app.get('/SISCOM/usuarios', (req, res) => {
	Usuarios.find({},function(error,usuarios){
		if (error) throw error;	
		return res.status(200).json(usuarios)

	})
	

})



// GET PARA UNO ESPECIFICO POR ID
app.get('/SISCOM/usuarios/:usuariosId', (req, res)=> {
	Usuarios.findById(req.params.usuariosId, function(error,usuarios){
		if (error) throw error;	
		return res.status(200).json(usuarios)
})

})


// TIPO PUT, 'use strict'
// modelo para guardar los productos en mongo

app.put('/SISCOM/usuarios/:usuariosId', (req, res)=> {

	console.log(req.body)
	Usuarios.findOneAndUpdate({_id:req.params.usuariosId},{$set:req.body},{new:true},function(error,updatedUsuarios){
		if (error) throw error;
		if (updatedUsuarios){
			return res.status(201).json({message: 'El usuario se ha actualizado',
				updatedUsuarios:updatedUsuarios});
		}
		return res.status(500).json({message: 'Error desconocido'});
	})

})


// TIPO DELETE

app.delete('/SISCOM/usuarios/:usuariosId', (req, res) => {

	Usuarios.find({_id:req.params.usuariosId}).remove().exec(function(error,data){
		if (error) throw error;
		return res.status(200).json({message: 'El usuario se ha eliminado',
			data:data});
	
			return res.status(500).json({message: 'Error desconocido'});
	})
})


app.listen(port,() => {
console.log(`PROYECTO SISCOM corriendo en http://localhost:${port}`)

})
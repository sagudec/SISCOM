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

app.post('/SISCOM/estados', (req, res)=> {

	// para poder ver el cuerpo de la peticion
	console.log(req.body)
	let newEstado = Estado(req.body);
	newEstado.save(function(error,createdEstados){
		if (error) throw error;
		if (createdEstados){
			return res.status(200).json({message: 'EL estado se ha recibido',
				createdEstados:createdEstados});
		}
		return res.status(500).json({message: 'Error desconocido'});
	})
})





// TIPO GET, PARA QUE MUESTRE LOS SERVICIOS

app.get('/SISCOM/estados', (req, res) => {
	Estado.find({},function(error,estados){
		if (error) throw error;	
		return res.status(200).json(estados)

	})
	

})



// GET PARA UNO ESPECIFICO POR ID
app.get('/SISCOM/estados/:estadosId', (req, res)=> {
	Estado.findById(req.params.estadosId, function(error,estados){
		if (error) throw error;	
		return res.status(200).json(estados)
})

})


// TIPO PUT, 'use strict'
// modelo para guardar los productos en mongo

app.put('/SISCOM/estados/:estadosId', (req, res)=> {

	console.log(req.body)
	Estado.findOneAndUpdate({_id:req.params.estadosId},{$set:req.body},{new:true},function(error,updatedEstados){
		if (error) throw error;
		if (updatedEstados){
			return res.status(201).json({message: 'El estado se ha actualizado',
				updatedEstados:updatedEstados});
		}
		return res.status(500).json({message: 'Error desconocido'});
	})

})


// TIPO DELETE

app.delete('/SISCOM/estados/:estadosId', (req, res) => {

	Estado.find({_id:req.params.estadosId}).remove().exec(function(error,data){
		if (error) throw error;
		return res.status(200).json({message: 'El estado se ha eliminado',
			data:data});
	
			return res.status(500).json({message: 'Error desconocido'});
	})
})

app.listen(port,() => {
console.log(`PROYECTO SISCOM corriendo en http://localhost:${port}`)

})
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

app.post('/SISCOM/solicitudes', (req, res)=> {

	// para poder ver el cuerpo de la peticion
	console.log(req.body)
	let newSolicitudes = Solicitudes(req.body);
	newSolicitudes.save(function(error,createdSolicitudes){
		if (error) throw error;
		if (createdSolicitudes){
			return res.status(200).json({message: 'La solicitud se ha recibido',
				createdSolicitudes:createdSolicitudes});
		}
		return res.status(500).json({message: 'Error desconocido'});
	})
})





// TIPO GET, PARA QUE MUESTRE LOS SERVICIOS

app.get('/SISCOM/solicitudes', (req, res) => {
	Solicitudes.find({},function(error,solicitudes){
		if (error) throw error;	
		return res.status(200).json(solicitudes)

	})
	

})



// GET PARA UNO ESPECIFICO POR ID
app.get('/SISCOM/solicitudes/:solicitudesId', (req, res)=> {
	Solicitudes.findById(req.params.solicitudesId, function(error,solicitudes){
		if (error) throw error;	
		return res.status(200).json(solicitudes)
})

})


// TIPO PUT, 'use strict'
// modelo para guardar los productos en mongo

app.put('/SISCOM/solicitudes/:solicitudesId', (req, res)=> {

	console.log(req.body)
	Solicitudes.findOneAndUpdate({_id:req.params.solicitudesId},{$set:req.body},{new:true},function(error,updatedSolicitudes){
		if (error) throw error;
		if (updatedSolicitudes){
			return res.status(201).json({message: 'la solicitud se ha actualizado',
				updatedSolicitudes:updatedSolicitudes});
		}
		return res.status(500).json({message: 'Error desconocido'});
	})

})


// TIPO DELETE

app.delete('/SISCOM/solicitudes/:solicitudesId', (req, res) => {

	Solicitudes.find({_id:req.params.solicitudesId}).remove().exec(function(error,data){
		if (error) throw error;
		return res.status(200).json({message: 'la solicitud se ha eliminado',
			data:data});
	
			return res.status(500).json({message: 'Error desconocido'});
	})
})

app.listen(port,() => {
console.log(`PROYECTO SISCOM corriendo en http://localhost:${port}`)

})
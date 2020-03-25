const express = require('express')
const routes = express.Router()

const ongController = require('./controllers/ongController')
const incidentController = require('./controllers/incidentCrontroller')
const profileController = require('./controllers/ProfileController')
const sessionController = require('./controllers/sessionController')

/** 
* Tipos de parâmetros   
*---------------------
* query params: Parâmetros nomeados enviados na rota após "?" usados para: filtros, paginação.
* routes params: Parâmetros utilizados para identifica recursos.
* request body: Corpo da requisição, utilizado pra criar ou alterar recursos.
*
* Pegar os dados
* ---------------
* query: req.query.
* routes: req.params.
* body: 
**/

routes.post('/session', sessionController.create)

routes.get('/profile/:id', profileController.index)

routes.get('/ongs', ongController.index) //Listar as ongs
routes.post('/ongs',  ongController.create) //Criar uma ong

routes.get('/incidents', incidentController.index)
routes.post('/incidents', incidentController.create)
routes.delete('/incidents/:id', incidentController.delete)


//Exporta uma váriavel de um arquivo
module.exports = routes;
const { request, response } = require('express');
const express = require('express');
const QuestionsController = require('./controllers/QuestionsController')
const RoomController = require('./controllers/RoomController')

const routes = express.Router()

routes.get('/', (request, response) => response.render('index', {page: 'enter-room'}))
routes.get('/create-pass', (request, response) => response.render('index', {page: 'create-pass'}))

routes.get('/room/:room', RoomController.open)
routes.post('/create-room', RoomController.create)
routes.post('/enter-room', RoomController.enter)

routes.post('/question/create/:roomId', QuestionsController.create)
routes.post('/question/:room/:question/:action', QuestionsController.index)

module.exports = routes

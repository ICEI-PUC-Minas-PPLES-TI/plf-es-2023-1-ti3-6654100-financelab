const express = require('express')
const UsuarioController = require('./Usuario/UsuarioController')
const UsuarioService = require('./Usuario/UsuarioService')
const HomeController = require('./Home/HomeController') 

const routes = express.Router()


routes.get('/usuarios', UsuarioService.index)
routes.get('/home', HomeController.index)
routes.post('/usuarios', UsuarioController.create)
routes.post('/login', UsuarioService.login)


module.exports = routes

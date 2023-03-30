const express = require('express')
const UsuarioController = require('./Usuario/UsuarioController')
const UsuarioService = require('./Usuario/UsuarioService')

const routes = express.Router()


routes.get('/usuarios', UsuarioService.index)
routes.post('/usuario', UsuarioController.create)
routes.post('/login', UsuarioService.login)


module.exports = routes

const express = require('express')
const UsuarioController = require('./Usuario/UsuarioController')
const UsuarioService = require('./Usuario/UsuarioService')
const HomeController = require('./Home/HomeController')
const InvestimentoController = require('./Investimentos/IvestimentosController') 
const InvestimentoServices = require('./Investimentos/IvestimentoService') 
const IvestimentoService = require('./Investimentos/IvestimentoService')

const routes = express.Router()

routes.get('/usuarios', UsuarioService.index)
routes.get('/home', HomeController.index)
routes.post('/usuarios', UsuarioController.create)
routes.post('/login', UsuarioService.login)
routes.get('/investimentos', IvestimentoService.index)
routes.post('/investimentos', InvestimentoController.create);
routes.delete('/investimentos', InvestimentoServices.deleteInvestimento)
routes.post('/updateInvestimentos', InvestimentoServices.updateInvestimento)

module.exports = routes

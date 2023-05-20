const express = require('express')
const UsuarioController = require('./Usuario/UsuarioController')
const UsuarioService = require('./Usuario/UsuarioService')
const HomeController = require('./Home/HomeController')
const InvestimentoController = require('./Investimentos/InvestimentosController') 
const InvestimentoServices = require('./Investimentos/InvestimentoService')
const TrocarSenhaService = require('./TrocarSenha/TrocarSenhaService')

const routes = express.Router()

routes.get('/usuarios', UsuarioService.index)
routes.get('/home', HomeController.index)
routes.post('/usuarios', UsuarioController.create)
routes.post('/login', UsuarioService.login)
routes.get('/investimentos', InvestimentoServices.index)
routes.post('/investimentos', InvestimentoController.create);
routes.delete('/investimentos', InvestimentoServices.deleteInvestimento)
routes.get('/investimentos/all/:id', InvestimentoController.getAllinvestimentosByUserId)

routes.post('/updateInvestimentos', InvestimentoServices.updateInvestimento)

routes.post('/tipo/investimento', InvestimentoController.createTipoInvestimento)
routes.get('/tipo/investimento/:id', InvestimentoController.getTiposDeInvestimentoById)
routes.post('/confirmaEmail', TrocarSenhaService.confirmaEmail)
routes.post('/trocarSenha', TrocarSenhaService.updateSenha)




module.exports = routes

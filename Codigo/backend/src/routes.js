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
routes.get('/investimento/:id', InvestimentoServices.getInvestimentoById)
routes.get('/investimento/relatorio/:id', InvestimentoServices.getInvestimentosComPrecoVenda)
routes.post('/investimentos', InvestimentoController.create);
routes.delete('/investimentos/:id', InvestimentoServices.deleteInvestimento)
routes.get('/investimentos/all/:id', InvestimentoController.getAllinvestimentosByUserId)

routes.get('/investimentos/acoes/:userId', InvestimentoController.getAllInvestimentosAcoes)

routes.post('/updateInvestimentos/:id', InvestimentoServices.updateInvestimento)

routes.post('/tipo/investimento', InvestimentoController.createTipoInvestimento)
routes.get('/tipo/investimento/:id', InvestimentoController.getTiposDeInvestimentoById)
routes.post('/confirmaEmail', TrocarSenhaService.confirmaEmail)
routes.post('/trocarSenha', TrocarSenhaService.updateSenha)

module.exports = routes

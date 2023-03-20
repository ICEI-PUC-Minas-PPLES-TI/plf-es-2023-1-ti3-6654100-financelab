const express = require('express');
const UsuarioController = require('./Usuario/UsuarioController');

const routes = express.Router();


routes.post('/usuario', UsuarioController.create);

module.exports = routes
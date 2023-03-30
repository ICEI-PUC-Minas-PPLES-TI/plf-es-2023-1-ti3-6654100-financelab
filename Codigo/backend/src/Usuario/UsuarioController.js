
const UsuarioService = require("./UsuarioService");
const connection = require('../database/connection');
const crypto = require('crypto');

module.exports = {
    async create(req, res) {
        const { email, nome, telefone, senha } = req.body;
        const id = crypto.randomBytes(4).toString('HEX');
        const userId = req.headers.authorization
    
        await UsuarioService.createUsuario({ id, email, nome, telefone, senha });
        return res.json({ email });
    },
}


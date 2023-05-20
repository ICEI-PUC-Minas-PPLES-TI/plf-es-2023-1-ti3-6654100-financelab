
const UsuarioService = require("./UsuarioService");
const crypto = require('crypto');

module.exports = {
    async create(req, res) {
        const { email, nome, telefone, senha, perguntaSeguranca } = req.body;
        const id = crypto.randomBytes(4).toString('HEX');
        const userEmail = req.headers.authorization
    
        await UsuarioService.createUsuario({ id, email, nome, telefone, senha, perguntaSeguranca });
        return res.json({ email });
    },
}


const connection = require('../database/connection');

module.exports = {
    async createUsuario(usuario) {
        await connection('usuario').insert(usuario);
    },
    async index(req, res) {
        const usuarios = await connection('usuario').select('*');
        return res.json(usuarios)
    },
    async login(req, res) {
        const { email, senha } = req.body
        const usuario = await connection('usuario').where({ email: email, senha: senha }).select('*')

        if (usuario.length !== 0) {
            res.status(200).json({ id: usuario[0].id, email: usuario[0].email, senha: usuario[0].senha })
        } else {
            res.status(403).json({ message: 'acesso negado' })
        }
    },
}

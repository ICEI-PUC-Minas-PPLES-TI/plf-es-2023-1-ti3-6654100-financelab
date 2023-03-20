const connection = require('../database/connection');


module.exports = {
    async createUsuario(usuario) {
        await connection('usuario').insert(usuario);
    }
}

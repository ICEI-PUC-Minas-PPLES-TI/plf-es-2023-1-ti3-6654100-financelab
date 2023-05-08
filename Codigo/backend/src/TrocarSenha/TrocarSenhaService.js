const connection = require('../database/connection');

module.exports = {
    async confirmaEmail(req, res){
        const {email} = req.body
    
        const pergunta = await connection('usuario').where('email', email).select('*')

        if (pergunta.length > 0) {
            res.status(200).json({
                perguntaSeguranca : pergunta[0].perguntaSeguranca  
            })
        } else {
            res.status(403).json({ message: 'acesso negado' })
        }
    },

    async updateSenha(req, res){
        const { senha, email } = req.body;
        const novaSenha = await connection('usuario').where({ email : email})
                .update({
                    senha : senha
                })

                if(novaSenha > 0){
                    res.status(200).json({message: 'Senha atualizada'})
                } else {
                    res.status(403).json({message: 'Erro: Senha não atualizada'})
                }
    }
}

const connection = require('../database/connection');

module.exports = {
    async createInvestimento(investimento) {
        await connection('investimento').insert(investimento);
    },
    async index(req, res) {
        const investimentos = await connection('investimento').select('*');
        return res.json(investimentos)
    },
    async deleteInvestimento(req, res) {
        const { id } = req.body
        const investimento = await connection('investimento').where({ id: id}).del()

        if(investimento > 0){
            res.status(200).json({message: 'investimento excluído'})
        } else {
            res.status(403).json({message: 'investimento não existente'})
        }
    },
    async updateInvestimento(req, res){
        const { id, preco_compra, preco_venda, nome, descricao } = req.body;
        const investimento = await connection('investimento').where({ id: id})
                .update({
                    preco_compra: preco_compra,
                    preco_venda: preco_venda,
                    nome: nome,
                    descricao: descricao
                })

                if(investimento > 0){
                    res.status(200).json({message: 'investimento atualizado'})
                } else {
                    res.status(403).json({message: 'investimento não existente'})
                }
    }
}

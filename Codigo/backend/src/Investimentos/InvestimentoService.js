const connection = require('../database/connection');

module.exports = {
    async createTipoInvestimento(investimento) {
        return connection('tipo_investimento').insert(investimento);
    },

    async getTiposDeInvestimentoById(id) {
        const investimentos = await connection('tipo_investimento').select('*').where({ usuario_id: id });
        return investimentos;
    },


    async getAllInvestimentosByUserId(id) {
        const investimentos = await connection('investimento').select('*').where('usuario_id', '=', id);
        //     .join('investimento', 'tipo_investimento.id', '=', 'investimento.tipo_investimento_id')
        //     .where('tipo_investimento.usuario_id', '=', id);
        return investimentos;
    },



    async createInvestimento(investimento) {
        await connection('investimento').insert(investimento);
    },

    async index(req, res) {
        const investimentos = await connection('investimento').select('*');
        return res.json(investimentos)
    },

    async getInvestimentoById(req, res) {
        const { id } = req.params
        const investimento = await connection('investimento').select('*').where({id: id});
        return res.json(investimento)
    },

    async deleteInvestimento(req, res) {
        const { id } = req.params
        const investimento = await connection('investimento').where({ id: id }).del()

        if (investimento > 0) {
            res.status(200).json({ message: 'investimento excluído' })
        } else {
            res.status(403).json({ message: 'investimento não existente' })
        }
    },

    async updateInvestimento(req, res) {
        const { id } = req.params
        const { preco_compra, preco_venda, nome, descricao, quantidade } = req.body;
        const investimento = await connection('investimento').where({ id: id })
            .update({
                preco_compra: preco_compra,
                preco_venda: preco_venda,
                nome: nome,
                descricao: descricao,
                quantidade: quantidade,
            })

        if (investimento > 0) {
            res.status(200).json({ message: 'investimento atualizado' })
        } else {
            res.status(403).json({ message: 'investimento não existente' })
        }
    }
}


const InvestimentoService = require("./IvestimentoService");
const crypto = require('crypto');

module.exports = {
    async create(req, res) {
        const { preco_compra, preco_venda, nome, descricao } = req.body;
        const id = crypto.randomBytes(4).toString('HEX');
        const tipo_investimento_id = crypto.randomBytes(4).toString('HEX');

        await InvestimentoService.createInvestimento({ id, preco_compra, preco_venda, nome, descricao, tipo_investimento_id });
        return res.json({ nome });
    },
}


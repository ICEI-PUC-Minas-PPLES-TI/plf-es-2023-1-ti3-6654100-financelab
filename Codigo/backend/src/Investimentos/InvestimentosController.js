
const InvestimentoService = require("./InvestimentoService");
const crypto = require('crypto');
const yahooFinance = require('yahoo-finance');


module.exports = {
    async create(req, res) {
        const { preco_compra, preco_venda, nome, descricao, tipo_investimento, usuario_id, quantidade } = req.body;
        const id = crypto.randomBytes(4).toString('HEX');
        await InvestimentoService.createInvestimento({ id, preco_compra, preco_venda, nome, descricao, tipo_investimento, usuario_id, quantidade });
        return res.json({ nome });
    },

    async createTipoInvestimento(req, res) {
        const { Tipo, MetaDiaria, MetaMensal, usuario_id } = req.body;
        const id = crypto.randomBytes(4).toString('HEX');
        return res.json(InvestimentoService.createTipoInvestimento({ id, Tipo, MetaDiaria, MetaMensal, usuario_id }));
    },

    async getTiposDeInvestimentoById(req, res) {
        const id = req.params.id;
        const result = await InvestimentoService.getTiposDeInvestimentoById(id);
        return res.json({ result })
    },

    async getAllinvestimentosByUserId(req, res) {
        const id = req.params.id;
        const result = await InvestimentoService.getAllInvestimentosByUserId(id);
        return res.json({ result })
    },

    async getAllInvestimentosAcoes(req, res) {
        try {
            const userId = req.params.userId;
            let result = await InvestimentoService.getAllInvestimentosByUserId(userId);
            result = result.filter(r => (r.tipo_investimento === 'Bolsa' || r.tipo_investimento === 'FundoImobiliario'));
            const finalResponse = [];
            for (const eachR of result) {
                try {
                    const response = await yahooFinance.quote({
                        symbol: `${eachR.nome}.SA`,
                        modules: ['price'],
                    });
                    finalResponse.push({ ...eachR, preco_atual: response.price.regularMarketPrice });
                } catch (e) {
                    finalResponse.push(eachR);

                    console.log(e);
                }
            }
            return res.json(finalResponse)

        } catch (error) {
            console.error('Erro ao obter a cotação:', error);
        }
    }
}


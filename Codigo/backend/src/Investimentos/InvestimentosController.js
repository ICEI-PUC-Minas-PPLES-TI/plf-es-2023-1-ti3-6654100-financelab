
const InvestimentoService = require("./InvestimentoService");
const crypto = require('crypto');

module.exports = {
    async create(req, res) {
        const { preco_compra, preco_venda, nome, descricao, tipo_investimento_id } = req.body;
        const id = crypto.randomBytes(4).toString('HEX');
        await InvestimentoService.createInvestimento({ id, preco_compra, preco_venda, nome, descricao, tipo_investimento_id });
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
    async getAllacoes(req, res) {
        
        console.log(req.query);
       
        
        await InvestimentoService.getDadosAPIExterna(req,res);
    
    }
}


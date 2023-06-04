import React, { useEffect, useState } from 'react'
import { Container, Table } from 'react-bootstrap';
import api from '../../services/api'



export default function Acoes() {

    function calcularVariacaoPercentual(precoCompra, precoAtual) {
        if (precoAtual) {
            var variacao = ((precoAtual - precoCompra) / precoCompra) * 100;
            var sinal = (variacao >= 0) ? '+' : '-';
            var porcentagem = Math.abs(variacao).toFixed(2);

            return sinal + porcentagem + '%';

        }
    }


    const [acoes, setAcoes] = useState([]);
    useEffect(() => {
        (async () => {
            const id = localStorage.getItem('userId')
            const response = await api.get(`investimentos/acoes/${id}`);
            const ac = response.data.filter(each => !each.preco_venda);
            setAcoes(ac);
            console.log(response.data);
        })()
    }, [])

    return (
        <Container>
            <h1>Suas ações em tempo real</h1>
            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th>Nome</th>
                        <th>Descrição</th>
                        <th>Quantidade</th>
                        <th>Preço Compra</th>
                        <th>Preço Atual</th>
                        <th>Variação</th>
                    </tr>
                </thead>
                <tbody>
                    {acoes.map(acoes => (
                        <tr key={acoes.id}>
                            <td>{acoes.nome}</td>
                            <td>{acoes.descricao}</td>
                            <td>{acoes.quantidade}</td>
                            <td>{acoes.preco_compra}</td>
                            <td>{acoes.preco_atual}</td>
                            <td>{calcularVariacaoPercentual(acoes.preco_compra, acoes.preco_atual)}</td>
                        </tr>
                    ))}
                </tbody>
            </Table>

        </Container>
    )
}
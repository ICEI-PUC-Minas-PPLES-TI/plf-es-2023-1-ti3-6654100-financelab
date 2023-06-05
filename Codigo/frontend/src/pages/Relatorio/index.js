import React, { useState, useEffect, isValidElement } from 'react'
import { Table, Button, Container } from 'react-bootstrap'
import api from '../../services/api'
import './styles.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPenToSquare, faTrash } from '@fortawesome/free-solid-svg-icons'
import { all } from 'axios'
import { Link } from 'react-router-dom'
import financeLabLogo from '../../img/FinanceLabLogo.png'

export default function Relatorio() {
  const [listInvestimentos, setListInvestimentos] = useState([])

  useEffect(() => {
    ;(async () => {
      const id = localStorage.getItem('userId')
      const allInvestimentos = await api.get(`investimento/relatorio/${id}`)

      console.log(allInvestimentos.data)
      setListInvestimentos(allInvestimentos.data)
    })()
  }, [])

  function calcularLucroTotal() {
    let lucro = 0
    let porcentagem
    listInvestimentos.forEach(investment => {
      lucro +=
        (investment.preco_venda - investment.preco_compra) *
        investment.quantidade
    })

    console.log(lucro)
    return lucro
  }

  return (
    <>
      <header>
        <div className="px-3 py-2 sticky-top container">
          <div
            className="d-flex flex-wrap align-items-center justify-content-center"
            style={{ height: '100%' }}
          >
            <Link to="/" style={{ display: 'flex', alignItems: 'center' }}>
              <img
                className="mx-auto"
                style={{ maxWidth: '25%', maxHeight: '100%' }}
                src={financeLabLogo}
                alt="Logo"
              />
            </Link>
          </div>
        </div>
      </header>
      <Container>
        <h1>Relatório</h1>
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>Nome</th>
              <th>Descrição</th>
              <th>Tipo</th>
              <th>Preço Compra</th>
              <th>Preço Venda</th>
              <th>Quantidade</th>
              <th>Lucro/Prejuízo</th>
            </tr>
          </thead>
          <tbody>
            {listInvestimentos.map(investment => (
              <tr key={investment.id}>
                <td>{investment.nome}</td>
                <td>{investment.descricao}</td>
                <td>{investment.tipo_investimento}</td>
                {/* <td>{investment.MetaMensal}</td>
              <td>{investment.MetaDiaria}</td>  */}
                <td>{investment.preco_compra}</td>
                <td>{investment.preco_venda}</td>
                <td>{investment.quantidade}</td>
                <td>
                  {(
                    (investment.preco_venda - investment.preco_compra) *
                    investment.quantidade
                  ).toLocaleString('pt-BR', {
                    style: 'currency',
                    currency: 'BRL'
                  })}
                  &nbsp; (
                  {(
                    (investment.preco_venda / investment.preco_compra - 1) *
                    100
                  ).toFixed(2)}
                  )%
                </td>
              </tr>
            ))}
          </tbody>
          <h2>
            Total de Lucro/Prejuízo: R${' '}
            {calcularLucroTotal().toLocaleString('pt-BR', {
              style: 'currency',
              currency: 'BRL'
            })}
          </h2>
        </Table>
      </Container>
    </>
  )
}

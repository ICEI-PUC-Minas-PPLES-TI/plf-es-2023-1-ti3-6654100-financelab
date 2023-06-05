import React, { useEffect, useState } from 'react'
import { PieChart, Pie, Legend, Tooltip, Cell } from 'recharts'
import { Container, Table } from 'react-bootstrap'
import api from '../../services/api'
import './dashboard.css'
import financeLabLogo from '../../img/FinanceLabLogo.png'
import { Link } from 'react-router-dom'

export default function DashBoard() {
  const [data, setData] = useState([])

  useEffect(() => {
    ;(async () => {
      const valueByType = new Map()
      try {
        const id = localStorage.getItem('userId')
        const response = await api.get(`investimentos/all/${id}`)
        const filtered = response.data.result.filter(each => !each.preco_venda)
        filtered.forEach(el => {
          if (el.preco_compra != '') {
            if (valueByType.has(el.tipo_investimento)) {
              const newValue =
                valueByType.get(el.tipo_investimento) +
                el.preco_compra * el.quantidade
              valueByType.set(el.tipo_investimento, newValue)
            } else {
              valueByType.set(
                el.tipo_investimento,
                el.preco_compra * el.quantidade
              )
            }
          }
        })
        const arraydataDeObjetos = Array.from(valueByType, ([name, value]) => ({
          name,
          value
        }))
        console.log(arraydataDeObjetos)
        setData(arraydataDeObjetos)
      } catch (e) {
        console.log(e)
      }
    })()
  }, [])

  function calcularVariacaoPercentual(precoCompra, precoAtual) {
    if (precoAtual) {
      var variacao = ((precoAtual - precoCompra) / precoCompra) * 100
      var sinal = variacao >= 0 ? '+' : '-'
      var porcentagem = Math.abs(variacao).toFixed(2)

      return sinal + porcentagem + '%'
    }
  }

  const [acoes, setAcoes] = useState([])
  useEffect(() => {
    ;(async () => {
      const id = localStorage.getItem('userId')
      const response = await api.get(`investimentos/acoes/${id}`)
      const ac = response.data.filter(each => !each.preco_venda)
      setAcoes(ac)
      console.log(response.data)
    })()
  }, [])

  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042']

  return (
    <div>
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

      <h1 className="dashboardDiv">Gráfico de investimentos</h1>

      <div className="dashboardDiv">
        <PieChart width={400} height={400}>
          <Pie
            data={data}
            cx={200}
            cy={200}
            innerRadius={60}
            outerRadius={80}
            fill="#8884d8"
            paddingAngle={5}
            dataKey="value"
          >
            {data.map((entry, index) => (
              <Cell
                key={`cell-${index}`}
                fill={COLORS[index % COLORS.length]}
              />
            ))}
          </Pie>
          <Tooltip />
          <Legend />
        </PieChart>
      </div>

      <Container className="container">
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
                <td>
                  {calcularVariacaoPercentual(
                    acoes.preco_compra,
                    acoes.preco_atual
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </Container>
    </div>
  )
}

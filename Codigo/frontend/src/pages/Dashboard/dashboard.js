import React, { useEffect, useState } from 'react'
import { PieChart, Pie, Legend, Tooltip, Cell } from 'recharts'
import { Container, Table } from 'react-bootstrap'
import api from '../../services/api'
import './dashboard.css'
import financeLabLogo from '../../img/FinanceLabLogo.png'
import { Link } from 'react-router-dom'

export default function DashBoard() {
  const [{ none, visible }, setDisplay] = useState({ none: 'none', visible: '' })
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
      <svg xmlns="http://www.w3.org/2000/svg" style={{ display: 'none' }}>
        <symbol id="home" viewBox="0 0 16 16" style={{ display: visible }}>
          <path
            d="M8.354 1.146a.5.5 0 0 0-.708 0l-6 6A.5.5 0 0 0 1.5 7.5v7a.5.5 0 0 0 .5.5h4.5a.5.5 0 0 0 .5-.5v-4h2v4a.5.5 0 0 0 .5.5H14a.5.5 0 0 0 .5-.5v-7a.5.5 0 0 0-.146-.354L13 5.793V2.5a.5.5 0 0 0-.5-.5h-1a.5.5 0 0 0-.5.5v1.293L8.354 1.146zM2.5 14V7.707l5.5-5.5 5.5 5.5V14H10v-4a.5.5 0 0 0-.5-.5h-3a.5.5 0 0 0-.5.5v4H2.5z"
          ></path>
        </symbol>
        <symbol id="speedometer2" viewBox="0 0 16 16" style={{ display: visible }}>
          <path
            d="M8 4a.5.5 0 0 1 .5.5V6a.5.5 0 0 1-1 0V4.5A.5.5 0 0 1 8 4zM3.732 5.732a.5.5 0 0 1 .707 0l.915.914a.5.5 0 1 1-.708.708l-.914-.915a.5.5 0 0 1 0-.707zM2 10a.5.5 0 0 1 .5-.5h1.586a.5.5 0 0 1 0 1H2.5A.5.5 0 0 1 2 10zm9.5 0a.5.5 0 0 1 .5-.5h1.5a.5.5 0 0 1 0 1H12a.5.5 0 0 1-.5-.5zm.754-4.246a.389.389 0 0 0-.527-.02L7.547 9.31a.91.91 0 1 0 1.302 1.258l3.434-4.297a.389.389 0 0 0-.029-.518z"
          ></path>
          <path
            fillRule="evenodd"
            d="M0 10a8 8 0 1 1 15.547 2.661c-.442 1.253-1.845 1.602-2.932 1.25C11.309 13.488 9.475 13 8 13c-1.474 0-3.31.488-4.615.911-1.087.352-2.49.003-2.932-1.25A7.988 7.988 0 0 1 0 10zm8-7a7 7 0 0 0-6.603 9.329c.203.575.923.876 1.68.63C4.397 12.533 6.358 12 8 12s3.604.532 4.923.96c.757.245 1.477-.056 1.68-.631A7 7 0 0 0 8 3z"
          ></path>
        </symbol>
        <symbol id="table" viewBox="0 0 16 16" style={{ display: visible }}>
          <path
            d="M0 2a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V2zm15 2h-4v3h4V4zm0 4h-4v3h4V8zm0 4h-4v3h3a1 1 0 0 0 1-1v-2zm-5 3v-3H6v3h4zm-5 0v-3H1v2a1 1 0 0 0 1 1h3zm-4-4h4V8H1v3zm0-4h4V4H1v3zm5-3v3h4V4H6zm4 4H6v3h4V8z"
          ></path>
        </symbol>
        <symbol id="people-circle" viewBox="0 0 16 16" style={{ display: none }}>
          <path d="M11 6a3 3 0 1 1-6 0 3 3 0 0 1 6 0z"></path>
          <path
            fillRule="evenodd"
            d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8zm8-7a7 7 0 0 0-5.468 11.37C3.242 11.226 4.805 10 8 10s4.757 1.225 5.468 2.37A7 7 0 0 0 8 1z"
          ></path>
        </symbol>
        <symbol id="grid" viewBox="0 0 16 16" style={{ display: visible }}>
          <path
            d="M1 2.5A1.5 1.5 0 0 1 2.5 1h3A1.5 1.5 0 0 1 7 2.5v3A1.5 1.5 0 0 1 5.5 7h-3A1.5 1.5 0 0 1 1 5.5v-3zM2.5 2a.5.5 0 0 0-.5.5v3a.5.5 0 0 0 .5.5h3a.5.5 0 0 0 .5-.5v-3a.5.5 0 0 0-.5-.5h-3zm6.5.5A1.5 1.5 0 0 1 10.5 1h3A1.5 1.5 0 0 1 15 2.5v3A1.5 1.5 0 0 1 13.5 7h-3A1.5 1.5 0 0 1 9 5.5v-3zm1.5-.5a.5.5 0 0 0-.5.5v3a.5.5 0 0 0 .5.5h3a.5.5 0 0 0 .5-.5v-3a.5.5 0 0 0-.5-.5h-3zM1 10.5A1.5 1.5 0 0 1 2.5 9h3A1.5 1.5 0 0 1 7 10.5v3A1.5 1.5 0 0 1 5.5 15h-3A1.5 1.5 0 0 1 1 13.5v-3zm1.5-.5a.5.5 0 0 0-.5.5v3a.5.5 0 0 0 .5.5h3a.5.5 0 0 0 .5-.5v-3a.5.5 0 0 0-.5-.5h-3zm6.5.5A1.5 1.5 0 0 1 10.5 9h3a1.5 1.5 0 0 1 1.5 1.5v3a1.5 1.5 0 0 1-1.5 1.5h-3A1.5 1.5 0 0 1 9 13.5v-3zm1.5-.5a.5.5 0 0 0-.5.5v3a.5.5 0 0 0 .5.5h3a.5.5 0 0 0 .5-.5v-3a.5.5 0 0 0-.5-.5h-3z"
          ></path>
        </symbol>
        {/* <symbol id="logout" viewBox="0 0 512 512" style={{ display: visible }}>
          <path
            d="M377.9 105.9L500.7 228.7c7.2 7.2 11.3 17.1 11.3 27.3s-4.1 20.1-11.3 27.3L377.9 406.1c-6.4 6.4-15 9.9-24 9.9c-18.7 0-33.9-15.2-33.9-33.9l0-62.1-128 0c-17.7 0-32-14.3-32-32l0-64c0-17.7 14.3-32 32-32l128 0 0-62.1c0-18.7 15.2-33.9 33.9-33.9c9 0 17.6 3.6 24 9.9zM160 96L96 96c-17.7 0-32 14.3-32 32l0 256c0 17.7 14.3 32 32 32l64 0c17.7 0 32 14.3 32 32s-14.3 32-32 32l-64 0c-53 0-96-43-96-96L0 128C0 75 43 32 96 32l64 0c17.7 0 32 14.3 32 32s-14.3 32-32 32z"
          ></path>
        </symbol> */}
        <symbol id="relatorio" viewBox="0 0 384 512" style={{ display: visible }}>
          <path
            d="M0 64C0 28.7 28.7 0 64 0H224V128c0 17.7 14.3 32 32 32H384V448c0 35.3-28.7 64-64 64H64c-35.3 0-64-28.7-64-64V64zm384 64H256V0L384 128z"
          ></path>
        </symbol>
      </svg>

      <header>
        <div className="px-3 py-2 sticky-top">
          <div className="container">
            <div
              className="d-flex flex-wrap align-items-center justify-content-center justify-content-lg-start"
            >
              <Link to="/"
                className="d-flex align-items-center my-2 my-lg-0 me-lg-auto text-black text-decoration-none"
              >
                {/* <svg
                  className="bi me-2"
                  width="40"
                  height="32"
                  role="img"
                  aria-label="Bootstrap"
                >
                  <img width="25%" src={financeLabLogo} alt="Logo" />
                </svg> */}
                <img width="25%" src={financeLabLogo} alt="Logo" />
              </Link>

              <ul className="nav col-12 col-lg-auto my-2 justify-content-center my-md-0 text-small">
                <li>
                  <Link to="/dashboard" className="nav-link text-secondary" style={{ display: visible }}>
                    <svg className="bi d-block mx-auto mb-1" width="24" height="24">
                      <use xlinkHref="#speedometer2"></use>
                    </svg>
                    Dashboard
                  </Link>
                </li>
                <li>
                  <Link to="/investimentos" className="nav-link text-secondary" style={{ display: visible }}>
                    <svg className="bi d-block mx-auto mb-1" width="24" height="24">
                      <use xlinkHref="#grid"></use>
                    </svg>
                    Investimentos
                  </Link>
                </li>
                <li>
                  <Link to="/login" className="nav-link text-black" style={{ display: none }}>
                    <svg className="bi d-block mx-auto mb-1" width="24" height="24">
                      <use xlinkHref="#people-circle"></use>
                    </svg>
                    Login
                  </Link>
                </li>
                <li>
                  <Link to="/relatorio" className="nav-link text-secondary" style={{ display: visible }}>
                    <svg className="bi d-block mx-auto mb-1" width="24" height="24">
                      <use xlinkHref="#relatorio"></use>
                    </svg>
                    Relatorio
                  </Link>
                </li>
                {/* <li>
                  <Link to="/" className="nav-link text-black" style={{ display: visible }} onClick={handleLogout}>
                    <svg className="bi d-block mx-auto mb-1" width="24" height="24">
                      <use xlinkHref="#logout"></use>
                    </svg>
                    Logout
                  </Link>
                </li> */}
              </ul>
            </div>
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
        <h1>Suas ações e FII em tempo real</h1>
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>Tipo Investimento</th>
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
                <td>{acoes.tipo_investimento}</td>
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

      <footer id="rodapedash" style={{ position: 'fixed', left: 0, bottom: 0, width: '100%' }}>
      <div className="row">
        <div className="col-lg-12" id="copyright">
          <p><i className="far fa-copyright"></i> Copyright PUC MINAS 2023</p>
        </div>
      </div>
    </footer >
    </div>
  )
}

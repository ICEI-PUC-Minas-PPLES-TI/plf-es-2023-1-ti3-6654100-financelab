import React, { useState, useEffect } from 'react'
import './home.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import brightBackground from '../../img/HomeImgs/brightBackground.jpg'
import grafico from '../../img/HomeImgs/grafico.jpg'
import relatorio from '../../img/HomeImgs/relatorio.jpg'
import financeLabLogo from '../../img/FinanceLabLogo.png'
import contaMao from '../../img/HomeImgs/contaMao.jpeg'
import cadastroInvest from '../../img/HomeImgs/cadastroInvest.jpeg'
import api from '../../services/api'


import { Link } from "react-router-dom";

export default function Home() {

  const [displayNone, setDisplayNone] = useState('none')
  const [displayVisible, setDisplayVisible] = useState('visible')
  const userEmail = localStorage.getItem('userEmail')

  useEffect(() => {
    if(userEmail !== null){
      api.get('home', {
        headers: {
          Authorization: userEmail
        }
      }).then(res => {
          if(res.status === 200){
            setDisplayNone('')
            setDisplayVisible('none')
          } 
        }
      )
    }
  }, [userEmail])

  return (
    <div>
    <svg xmlns="http://www.w3.org/2000/svg" style={{display: 'none'}}>
      <symbol id="home" viewBox="0 0 16 16" style={{display: displayNone}}>
        <path
          d="M8.354 1.146a.5.5 0 0 0-.708 0l-6 6A.5.5 0 0 0 1.5 7.5v7a.5.5 0 0 0 .5.5h4.5a.5.5 0 0 0 .5-.5v-4h2v4a.5.5 0 0 0 .5.5H14a.5.5 0 0 0 .5-.5v-7a.5.5 0 0 0-.146-.354L13 5.793V2.5a.5.5 0 0 0-.5-.5h-1a.5.5 0 0 0-.5.5v1.293L8.354 1.146zM2.5 14V7.707l5.5-5.5 5.5 5.5V14H10v-4a.5.5 0 0 0-.5-.5h-3a.5.5 0 0 0-.5.5v4H2.5z"
        ></path>
      </symbol>
      <symbol id="speedometer2" viewBox="0 0 16 16" style={{display: displayNone}}>
        <path
          d="M8 4a.5.5 0 0 1 .5.5V6a.5.5 0 0 1-1 0V4.5A.5.5 0 0 1 8 4zM3.732 5.732a.5.5 0 0 1 .707 0l.915.914a.5.5 0 1 1-.708.708l-.914-.915a.5.5 0 0 1 0-.707zM2 10a.5.5 0 0 1 .5-.5h1.586a.5.5 0 0 1 0 1H2.5A.5.5 0 0 1 2 10zm9.5 0a.5.5 0 0 1 .5-.5h1.5a.5.5 0 0 1 0 1H12a.5.5 0 0 1-.5-.5zm.754-4.246a.389.389 0 0 0-.527-.02L7.547 9.31a.91.91 0 1 0 1.302 1.258l3.434-4.297a.389.389 0 0 0-.029-.518z"
        ></path>
        <path
          fillRule="evenodd"
          d="M0 10a8 8 0 1 1 15.547 2.661c-.442 1.253-1.845 1.602-2.932 1.25C11.309 13.488 9.475 13 8 13c-1.474 0-3.31.488-4.615.911-1.087.352-2.49.003-2.932-1.25A7.988 7.988 0 0 1 0 10zm8-7a7 7 0 0 0-6.603 9.329c.203.575.923.876 1.68.63C4.397 12.533 6.358 12 8 12s3.604.532 4.923.96c.757.245 1.477-.056 1.68-.631A7 7 0 0 0 8 3z"
        ></path>
      </symbol>
      <symbol id="table" viewBox="0 0 16 16" style={{display: displayNone}}>
        <path
          d="M0 2a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V2zm15 2h-4v3h4V4zm0 4h-4v3h4V8zm0 4h-4v3h3a1 1 0 0 0 1-1v-2zm-5 3v-3H6v3h4zm-5 0v-3H1v2a1 1 0 0 0 1 1h3zm-4-4h4V8H1v3zm0-4h4V4H1v3zm5-3v3h4V4H6zm4 4H6v3h4V8z"
        ></path>
      </symbol>
      <symbol id="people-circle" viewBox="0 0 16 16" style={{display: displayVisible}}>
        <path d="M11 6a3 3 0 1 1-6 0 3 3 0 0 1 6 0z"></path>
        <path
          fillRule="evenodd"
          d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8zm8-7a7 7 0 0 0-5.468 11.37C3.242 11.226 4.805 10 8 10s4.757 1.225 5.468 2.37A7 7 0 0 0 8 1z"
        ></path>
      </symbol>
      <symbol id="grid" viewBox="0 0 16 16" style={{display: displayNone}}>
        <path
          d="M1 2.5A1.5 1.5 0 0 1 2.5 1h3A1.5 1.5 0 0 1 7 2.5v3A1.5 1.5 0 0 1 5.5 7h-3A1.5 1.5 0 0 1 1 5.5v-3zM2.5 2a.5.5 0 0 0-.5.5v3a.5.5 0 0 0 .5.5h3a.5.5 0 0 0 .5-.5v-3a.5.5 0 0 0-.5-.5h-3zm6.5.5A1.5 1.5 0 0 1 10.5 1h3A1.5 1.5 0 0 1 15 2.5v3A1.5 1.5 0 0 1 13.5 7h-3A1.5 1.5 0 0 1 9 5.5v-3zm1.5-.5a.5.5 0 0 0-.5.5v3a.5.5 0 0 0 .5.5h3a.5.5 0 0 0 .5-.5v-3a.5.5 0 0 0-.5-.5h-3zM1 10.5A1.5 1.5 0 0 1 2.5 9h3A1.5 1.5 0 0 1 7 10.5v3A1.5 1.5 0 0 1 5.5 15h-3A1.5 1.5 0 0 1 1 13.5v-3zm1.5-.5a.5.5 0 0 0-.5.5v3a.5.5 0 0 0 .5.5h3a.5.5 0 0 0 .5-.5v-3a.5.5 0 0 0-.5-.5h-3zm6.5.5A1.5 1.5 0 0 1 10.5 9h3a1.5 1.5 0 0 1 1.5 1.5v3a1.5 1.5 0 0 1-1.5 1.5h-3A1.5 1.5 0 0 1 9 13.5v-3zm1.5-.5a.5.5 0 0 0-.5.5v3a.5.5 0 0 0 .5.5h3a.5.5 0 0 0 .5-.5v-3a.5.5 0 0 0-.5-.5h-3z"
        ></path>
      </symbol>
    </svg>
    <main>
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


              <ul
                className="nav col-12 col-lg-auto my-2 justify-content-center my-md-0 text-small"
              >
                <li>
                  <Link to="/" className="nav-link text-secondary" style={{display: displayNone}}>
                    <svg className="bi d-block mx-auto mb-1" width="24" height="24">
                      <use xlinkHref="#home"></use>
                    </svg>
                    Home
                  </Link>
                </li>
                <li>
                  <a href="#" className="nav-link text-black disabled" style={{display: displayNone}}>
                    <svg className="bi d-block mx-auto mb-1" width="24" height="24">
                      <use xlinkHref="#speedometer2"></use>
                    </svg>
                    Dashboard
                  </a>
                </li>
                <li>
                  <a href="#" className="nav-link text-black disabled" style={{display: displayNone}}>
                    <svg className="bi d-block mx-auto mb-1" width="24" height="24">
                      <use xlinkHref="#table"></use>
                    </svg>
                    Relatório
                  </a>
                </li>
                <li>
                  <a href="#" className="nav-link text-black disabled" style={{display: displayNone}}>
                    <svg className="bi d-block mx-auto mb-1" width="24" height="24">
                      <use xlinkHref="#grid"></use>
                    </svg>
                    Investimentos
                  </a>
                </li>
                <li>
                  <Link to="/login" className="nav-link text-black" style={{ display: displayVisible }}>
                    <svg className="bi d-block mx-auto mb-1" width="24" height="24">
                      <use xlinkHref="#people-circle"></use>
                    </svg>
                    Login
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </header>
      <section
        id="apresentacao"
        style={{backgroundImage: `url(${brightBackground})`, backgroundSize: 'cover'}}
      >
        <div
          className="position-relative overflow-hidden p-3 p-md-5 m-md-3 text-center"
        >
          <div className="col-md-5 p-lg-5 mx-auto my-5">
            <h1 className="display-4 fw-normal text-black">
              Gerenciador de investimentos
            </h1>
            <p className="lead fw-normal text-black">
              Gerencie o seu patrimônio e acompanhe a evolução dos seus
              investimentos.
            </p>
            <a className="btn btn-outline-secondary disabled" href="#"
              >Criar conta</a
            >
          </div>
          <div className="product-device shadow-sm d-none d-md-block"></div>
          <div
            className="product-device product-device-2 shadow-sm d-none d-md-block"
          ></div>
        </div>
      </section>
      <section id="motivos">
        <div className="d-md-flex flex-md-equal w-100 my-md-5 ps-md-5">
          <div
            className="text-bg me-md-3 pt-3 px-3 pt-md-5 px-md-5 text-center overflow-hidden"
          >
            <div className="my-3 py-3">
              <h2 className="display-5"><b>Dashboard de investimentos</b></h2>
              <p className="lead">Gráficos sobre o desempenho dos investimentos.</p>
              <p className="lead">Retorno sobre o investimento (ROI)</p>
              <p className="lead">Histórico de desempenho</p>
              <p className="lead">Alocação de ativos</p>
              <p className="lead">Valor atual dos investimentos</p>
            </div>
            <div
              className="bg-light shadow-sm mx-auto"
              style={{width: '80%', height: '300px', borderRadius: '21px 21px 0 0'}}
            >
              <img width="100%" src={grafico} alt="Grafico" />
            </div>
          </div>
          <div
            className="text-bg me-md-3 pt-3 px-3 pt-md-5 px-md-5 text-center overflow-hidden"
          >
            <div className="my-3 p-3">
              <h2 className="display-5"><b>Sem mais contas na mão!</b></h2>
              <p className="lead">Precisão: cálculos precisos e confiáveis</p>
              <p className="lead">
                Economia de tempo: cálculos são realizados automaticamente
              </p>
              <p className="lead">
                Análise de dados: desempenho de suas aplicações
              </p>
              <p className="lead">
                Controle: acompanhar de forma mais clara suas aplicações
              </p>
            </div>
            <div
              className="bg-dark shadow-sm mx-auto"
              style={{width: '80%', height: '300px', borderRadius: '21px 21px 0 0'}}
            >
              <img
                width="100%"
                src={contaMao}
                alt="Pessoa fazendo contas"
              />
            </div>
          </div>
        </div>
        <div className="d-md-flex flex-md-equal w-100 my-md-5 ps-md-5">
          <div
            className="text-bg me-md-3 pt-3 px-3 pt-md-5 px-md-5 text-center overflow-hidden"
          >
            <div className="my-3 py-3">
              <h2 className="display-5"><b>Carteira de ativos</b></h2>
              <p className="lead">Controle total dos seus investimentos.</p>
              <p className="lead">Renda Fixa</p>
              <p className="lead">Renda Variável</p>
            </div>
            <div
              className="bg-light shadow-sm mx-auto"
              style={{width: '80%', height: '300px', borderRadius: '21px 21px 0 0'}}
            >
              <img
                width="100%"
                src={cadastroInvest}
                alt="Grafico de setas"
              />
            </div>
          </div>
          <div
            className="text-bg me-md-3 pt-3 px-3 pt-md-5 px-md-5 text-center overflow-hidden"
          >
            <div className="my-3 p-3">
              <h2 className="display-5"><b>Relatórios</b></h2>
              <p className="lead">Relatórios mensais.</p>
              <p className="lead">Resultado do dia</p>
              <p className="lead">Histórico geral</p>
            </div>
            <div
              className="bg-dark shadow-sm mx-auto"
              style={{width: '80%', height: '300px', borderRadius: '21px 21px 0 0'}}
            >
              <img
                width="100%"
                src={relatorio}
                alt="Grafico de barras"
              />
            </div>
          </div>
        </div>
      </section>
    </main>
    <footer id="rodape">
      <div className="row">
        <div className="col-lg-12" id="copyright">
          <p><i className="far fa-copyright"></i> Copyright PUC MINAS 2023</p>
        </div>
      </div>
    </footer>
    </div>
  )
}

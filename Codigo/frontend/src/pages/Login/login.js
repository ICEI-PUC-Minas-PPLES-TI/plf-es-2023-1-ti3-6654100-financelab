import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import api from '../../services/api'
import financeLabLogo from '../../img/FinanceLabLogo.png'
import imgLogin from '../../img//LoginImgs/imglogin.jpg'
import './login.css'
import 'bootstrap/dist/css/bootstrap.min.css'

export default function Login() {
  const [email, setEmail] = useState('')
  const [senha, setSenha] = useState('')
  const [display, setDisplay] = useState('none')
  const navigate = useNavigate()

  async function handleLogin(event) {
    event.preventDefault()

    try {
      const response = await api.post('login', { email, senha })
      localStorage.setItem('userEmail', response.data.email)
      localStorage.setItem('userId', response.data.id)

      navigate('/')

    } catch (err) {
      setDisplay('')
    }
  }

  return (
    <div>
      <Link to="/" className="titulo">
        <img width="300px" src={financeLabLogo} alt="Logo" />
      </Link>
      <div className="img-main">
        <img className="imagem" src={imgLogin} alt="" />
      </div>
      <div className="container">
        <div className="row">
          <form className="col-sm-12 col-md-6 col-lg-3" onSubmit={handleLogin}>
            <h1 className="text-center">Login</h1>
            {/* <!-- Email input --> */}

            <div id="loginInvalido" style={{ display: display }}>
              <p>E-mail ou senha incorretos</p>
            </div>

            <div className="form-outline mb-4">
              <input
                type="email"
                id="form2Example1"
                className="form-control"
                value={email}
                onChange={event => setEmail(event.target.value)}
              />
              <label className="form-label" htmlFor="form2Example1">
                Email
              </label>
            </div>

            {/* <!-- Password input --> */}
            <div className="form-outline mb-2">
              <input
                type="password"
                id="form2Example2"
                className="form-control"
                value={senha}
                onChange={event => setSenha(event.target.value)}
              />
              <label className="form-label" htmlFor="form2Example2">
                Senha
              </label>
            </div>

            {/* <!-- 2 column grid layout for inline styling --> */}
            <div className="row mb-2">
              {/* <div className="col d-flex justify-content-center">
                {/* <!-- Checkbox --> */}
              {/* <div className="form-check">
              {/* <div class="form-check">
                  <input
                    className="form-check-input warning"
                    type="checkbox"
                    value=""
                    id="form2Example31"
                    checked
                  />
                  <label className="form-check-label" for="form2Example31">
                    {' '}
                    Lembrar de mim{' '}
                  </label>
                </div> */}
              {/* </div> */}

              <div className="col">
                {/* <!-- Simple link --> */}
                <a className="color" href="#!">
                  <Link to="/trocarSenha" class="color">
                    Esqueceu a senha?
                  </Link>
                </a>
              </div>
            </div>

            {/* <!-- Submit button --> */}
            <div className="botao">
              <button
                id="enviar"
                type="submit"
                className="btn btn-warning btn-block mb-4"
              >
                Enviar
              </button>
            </div>

            {/* <!-- Register buttons --> */}
            <div className="text-center">
              <p>
                Não é um membro ainda?{' '}
                <Link to="/cadastro" className="color">
                  Cadastrar
                </Link>
              </p>
            </div>
          </form>
        </div>
      </div>
      <footer> © Copyright PUC MINAS 2023</footer>
    </div>
  )
}

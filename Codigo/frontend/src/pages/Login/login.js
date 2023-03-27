import React, { useState } from 'react'
import './login.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import financeLabLogo from '../../img/FinanceLabLogo.png'
import imgLogin from '../../img//LoginImgs/imglogin.jpg'

export default function Login() {
  return (
    <div>
      <a class="titulo" href="index">
        <img width="300px" src={financeLabLogo} alt="Logo" />
      </a>
      <div class="img-main">
        <img class="imagem" src={imgLogin} alt="" />
      </div>
      <div class="container">
        <div class="row">
          <form class="col-sm-12 col-md-6 col-lg-3">
            <div id="loginInvalido" style={{display: 'none'}}>
              <p>E-mail ou senha incorretos</p>
            </div>

            {/* <!-- Email input --> */}
            <div class="form-outline mb-4">
              <input type="email" id="form2Example1" class="form-control" />
              <label class="form-label" for="form2Example1">
                Email
              </label>
            </div>

            {/* <!-- Password input --> */}
            <div class="form-outline mb-2">
              <input type="password" id="form2Example2" class="form-control" />
              <label class="form-label" for="form2Example2">
                Senha
              </label>
            </div>

            {/* <!-- 2 column grid layout for inline styling --> */}
            <div class="row mb-2">
              <div class="col d-flex justify-content-center">
                {/* <!-- Checkbox --> */}
                <div class="form-check">
                  <input
                    class="form-check-input warning"
                    type="checkbox"
                    value=""
                    id="form2Example31"
                    checked
                  />
                  <label class="form-check-label" for="form2Example31">
                    {' '}
                    Lembrar de mim{' '}
                  </label>
                </div>
              </div>

              <div class="col">
                {/* <!-- Simple link --> */}
                <a class="color" href="#!">
                  Esqueceu a senha?
                </a>
              </div>
            </div>

            {/* <!-- Submit button --> */}
            <div class="botao">
              <button
                id="enviar"
                type="button"
                class="btn btn-warning btn-block mb-4"
                onclick="validaLogin()"
              >
                Enviar
              </button>
            </div>

            {/* <!-- Register buttons --> */}
            <div class="text-center">
              <p>
                Não é um membro ainda?{' '}
                <a class="color" href="#!">
                  Cadastrar
                </a>
              </p>
            </div>
          </form>
        </div>
      </div>
      <footer> © Copyright PUC MINAS 2023</footer>
    </div>
  )
}

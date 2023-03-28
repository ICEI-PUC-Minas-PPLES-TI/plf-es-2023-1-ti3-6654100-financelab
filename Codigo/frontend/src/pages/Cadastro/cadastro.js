import React, { useState } from 'react'
import './cadastro.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import financeLabLogo from '../../img/FinanceLabLogo.png'
import imgCadastro from '../../img//CadastroImgs/cadastro.jfif'

import { Link } from "react-router-dom";

export default function Cadastro() {
    return (
        <div>

            <Link to="/" class="titulo" href="index">
                <img width="300px" src={financeLabLogo} alt="Logo" />
            </Link>
            <div class="img-main">
                <img class="imagem" src={imgCadastro} alt="" />
            </div>
            <div class="container">
                <div class="row">
                    <form class="col-sm-12 col-md-6 col-lg-3">
                    <h1 class="text-center">Cadastro</h1>
                        {/* <!-- Name input --> */}
                        <div class="d-flex flex-row align-items-center mb-4">
                            <i class="fas fa-user fa-lg me-3 fa-fw"></i>
                            <div class="form-outline flex-fill mb-0">
                                <input type="text" id="form3Example1c" class="form-control" />
                                <label class="form-label" for="form3Example1c">Nome</label>
                            </div>
                        </div>

                        {/* <!-- Email input --> */}
                        <div class="d-flex flex-row align-items-center mb-4">
                            <i class="fas fa-envelope fa-lg me-3 fa-fw"></i>
                            <div class="form-outline flex-fill mb-0">
                                <input type="email" id="form3Example3c" class="form-control" />
                                <label class="form-label" for="form3Example3c">Email</label>
                            </div>
                        </div>


                        {/* <!-- Password button --> */}
                        <div class="d-flex flex-row align-items-center mb-4">
                            <i class="fas fa-lock fa-lg me-3 fa-fw"></i>
                            <div class="form-outline flex-fill mb-0">
                                <input type="password" id="form3Example4c" class="form-control" />
                                <label class="form-label" for="form3Example4c">Senha</label>
                            </div>
                        </div>

                        {/* <!-- Register buttons --> */}
                        <div class="d-flex justify-content-center mx-4 mb-3 mb-lg-4">
                            <button type="button" class="btn btn-primary btn-lg" onclick="cadastrar()">Registrar</button>
                        </div>
                    </form>
                </div>
            </div>
            <footer> © Copyright PUC MINAS 2023</footer>
        </div>
    )
}

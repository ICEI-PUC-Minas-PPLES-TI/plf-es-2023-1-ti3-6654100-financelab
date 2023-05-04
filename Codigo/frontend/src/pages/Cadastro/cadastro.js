import React, { useState } from 'react'
import './cadastro.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import financeLabLogo from '../../img/FinanceLabLogo.png'
import imgCadastro from '../../img//CadastroImgs/cadastro.jfif'
import api from '../../services/api'
import { Link, useNavigate } from "react-router-dom";

export default function Cadastro() {
    const [email, setEmail] = useState('');
    const [nome, setNome] = useState('');
    const [telefone, setTelefone] = useState('');
    const [senha, setSenha] = useState('');
    const [perguntaSeguranca, setPerguntaSeguranca] = useState('');
    const [display, setDisplay] = useState('none')
    const navigate = useNavigate()


    async function handleCadastro(event) {
        event.preventDefault();
        try {
            console.log('oi');
            await api.post('usuario', { email, nome, telefone, senha, perguntaSeguranca });
            setDisplay(display === 'visible')
            setTimeout(() => {
                navigate('/login')
              }, 1000); // 2000 milissegundos = 2 segundos
            
        } catch (err) {
            console.log(err);
        }
    }

    return (
        <div>

            <Link to="/" class="titulo" href="index">
                <img width="300px" src={financeLabLogo} alt="Logo" />
            </Link>
            <div class="alert alert-success" role="alert" style={{ display: display }}>
                        Usuário cadastrado com sucesso
                    </div>
            <div class="img-main">
                <img class="imagem" src={imgCadastro} alt="" />
            </div>

            <div class="container">
                <div class="row">
                    
                    <form class="col-sm-12 col-md-6 col-lg-3" onSubmit={handleCadastro}>
                        <h1 class="text-center">Cadastro</h1>
                        {/* <!-- Name input --> */}
                        <div class="d-flex flex-row align-items-center mb-4">
                            <i class="fas fa-user fa-lg me-3 fa-fw"></i>
                            <div class="form-outline flex-fill mb-0">
                                <input
                                    value={nome}
                                    onChange={event => setNome(event.target.value)}
                                    type="text"
                                    id="form3Example1c"
                                    class="form-control"
                                />
                                <label class="form-label" for="form3Example1c">Nome</label>
                            </div>
                        </div>

                        {/* <!-- Email input --> */}
                        <div class="d-flex flex-row align-items-center mb-4">
                            <i class="fas fa-envelope fa-lg me-3 fa-fw"></i>
                            <div class="form-outline flex-fill mb-0">
                                <input
                                    type="email"
                                    id="form3Example3c"
                                    class="form-control"
                                    value={email}
                                    onChange={event => setEmail(event.target.value)}
                                />
                                <label class="form-label" for="form3Example3c">Email</label>
                            </div>
                        </div>


                        {/* <!-- Telefone input --> */}
                        <div class="d-flex flex-row align-items-center mb-4">
                            <i class="fas fa-envelope fa-lg me-3 fa-fw"></i>
                            <div class="form-outline flex-fill mb-0">
                                <input
                                    type="text"
                                    id="form3Example3c"
                                    class="form-control"
                                    value={telefone}
                                    onChange={event => setTelefone(event.target.value)}
                                />
                                <label class="form-label" for="form3Example3c">Telefone</label>
                            </div>
                        </div>

                         {/* <!-- Pergunta seguranca input --> */}
                         <div class="d-flex flex-row align-items-center mb-4">
                            <i class="fas fa-envelope fa-lg me-3 fa-fw"></i>
                            <div class="form-outline flex-fill mb-0">
                                <input
                                    type="text"
                                    id="form3Example3c"
                                    class="form-control"
                                    value={perguntaSeguranca}
                                    onChange={event => setPerguntaSeguranca(event.target.value)}
                                />
                                <label class="form-label" for="form3Example3c">Pergunta de Segurança: Qual era seu apelido de infância?</label>
                            </div>
                        </div>


                        {/* <!-- Password button --> */}
                        <div class="d-flex flex-row align-items-center mb-4">
                            <i class="fas fa-lock fa-lg me-3 fa-fw"></i>
                            <div class="form-outline flex-fill mb-0">
                                <input
                                    type="password"
                                    id="form3Example4c"
                                    class="form-control"
                                    value={senha}
                                    onChange={event => setSenha(event.target.value)}
                                />
                                <label class="form-label" for="form3Example4c">Senha</label>
                            </div>
                        </div>

                        {/* <!-- Register buttons --> */}
                        <div class="d-flex justify-content-center mx-4 mb-3 mb-lg-4">
                            <button type="submit" class="btn btn-primary btn-lg" >Registrar</button>
                        </div>
                    </form>
                </div>
            </div>
            <footer> © Copyright PUC MINAS 2023</footer>
        </div>
    )
}

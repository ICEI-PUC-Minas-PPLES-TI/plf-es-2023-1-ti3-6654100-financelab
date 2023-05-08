import React, { useState } from 'react'
import './trocarSenha.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import { Link, useNavigate } from 'react-router-dom'
import financeLabLogo from '../../img/FinanceLabLogo.png'

export default function TrocarSenha() {

    const navigate = useNavigate()
    const [senha, setSenha] = useState('')
    const [senhaConfirm, setSenhaConfirm] = useState('')
    const [pergunta, setPergunta] = useState('')
    const [emailConfirm, setEmailConfirm] = useState('')

    async function handleSubmit(event) {
        event.preventDefault()

        try {
            const response = await api.post('trocarSenha', { email })
            response.then(res => {
                if (res === pergunta) {

                }
            })
            navigate('/')

        } catch (err) {
            setDisplay('')
        }
    }


    function changePassword() {
        if (senha !== senhaConfirm) {
            alert('As senhas não coincidem')
            return
        }
        navigate('/login')
    }

    return (
        <div>
            <main>
                <header>
                    <div class="px-3 py-3">
                        <div class="container">
                            <div class="d-flex flex-wrap justify-content-center text-center">
                                <Link to="/">
                                    <img width="25%" src={financeLabLogo} alt="Logo" />
                                </Link>
                            </div>
                        </div>
                    </div>
                </header>
            </main>
            <section>
                <div>

                    <div class="container">

                        <form class="col-sm-12 col-md-6 col-lg-3 mx-auto">

                            <div class="mb-3">
                                <label htmlFor="password" class="form-label">Confirme seu E-mail</label>
                                <input type="email" name="emailConfirm" id="emailConfirm" class="form-control" value={emailConfirm} placeholder="••••••••" onChange={(e) => setEmailConfirm(e.currentTarget.value)}></input>
                            </div>

                            <div class="mb-3">
                                <label htmlFor="password" class="form-label">Pergunta de Segurança</label>
                                <input type="text" name="pergunta" id="perguntaSeguranca" class="form-control" value={pergunta} placeholder="••••••••" onChange={(e) => setPergunta(e.currentTarget.value)}></input>
                            </div>


                            <div class="mb-3">
                                <label htmlFor="password" class="form-label">Nova senha</label>
                                <input type="password" name="password" id="password" class="form-control" value={senha} placeholder="••••••••" onChange={(e) => setSenha(e.currentTarget.value)}></input>
                            </div>

                            <div class="mb-3">
                                <label htmlFor="confirm-password" class="form-label">Confirme a nova senha</label>
                                <input type="password" name="confirm-password" id="confirm-password" class="form-control" value={senhaConfirm} placeholder="••••••••" onChange={(e) => setSenhaConfirm(e.currentTarget.value)}></input>
                            </div>

                            <div class="botao">
                                <button
                                    onClick={() => changePassword()}
                                    id="enviar"
                                    type="submit"
                                    class="btn btn-block mb-4"
                                >
                                    Mudar senha
                                </button>
                            </div>
                        </form>

                    </div>

                </div>
            </section>
            <footer id="rodape">
                <div class="row">
                    <div class="col-lg-12" id="copyright">
                        <p><i class="far fa-copyright"></i> Copyright PUC MINAS 2023</p>
                    </div>
                </div>
            </footer>
        </div>
    )

}


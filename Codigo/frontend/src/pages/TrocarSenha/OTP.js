import React from "react";
import api from '../../services/api'
import './trocarSenha.css'
import { useState } from "react";
import 'bootstrap/dist/css/bootstrap.min.css'
import { Link, useNavigate } from 'react-router-dom'
import financeLabLogo from '../../img/FinanceLabLogo.png'

export default function OTP() {
  const [OTPinput, setOTPinput] = useState([0, 0, 0, 0]);
  const navigate = useNavigate()

  function verfiyOTP() {
    if (api.post("/verifyOtp", OTPinput)) {
      navigate('/trocarSenha');
      return;
    }
    alert(
      "O código digitado não está correto, tente novamente"
    );
    return;
  }

  function handleInputChange(index, value) {
    const newOTPinput = [...OTPinput];
    newOTPinput[index] = value;
    setOTPinput(newOTPinput);
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

        <section className="otp-section">
          <div className="otp-form-container">
            <div className="otp-form-wrapper">
              <div className="otp-form-header">
                <h2 className="otp-form-title">Verificação de e-mail</h2>
                <p className="otp-form-subtitle">Enviamos um código para o seu e-mail</p>
              </div>

              <form className="otp-form" onSubmit={(e) => e.preventDefault()}>
                <div className="otp-inputs-container">
                  {OTPinput.map((value, index) => (
                    <input
                      key={index}
                      maxLength="1"
                      className="otp-input"
                      type="text"
                      value={value}
                      onChange={(e) => handleInputChange(index, e.target.value)}
                    />
                  ))}
                </div>

                <div className="botao otp-button-container">
                  <button className="otp-button btn btn-block mb-4" onClick={() => verfiyOTP()}>
                    Verificar conta
                  </button>
                </div>
              </form>
            </div>
          </div>
        </section>

        {/* <div className="flex justify-center items-center w-screen h-screen bg-gray-50">
          <div className="bg-white px-6 pt-10 pb-9 shadow-xl mx-auto w-full max-w-lg rounded-2xl">
            <div className="mx-auto flex w-full max-w-md flex-col space-y-16">
              <div className="flex flex-col items-center justify-center text-center space-y-2">
                <div className="font-semibold text-3xl">
                  <p>Verificação de e-mail</p>
                </div>
                <div className="flex flex-row text-sm font-medium text-gray-400">
                  <p>Enviamos um código para o seu e-mail</p>
                </div>
              </div>

              <div>
                <form>
                  <div className="flex flex-col space-y-16">
                    <div className="flex flex-row items-center justify-between mx-auto w-full max-w-xs">
                      <div className="w-16 h-16 ">
                        <input
                          maxLength="1"
                          className="w-full h-full flex flex-col items-center justify-center text-center px-5 outline-none rounded-xl border border-gray-200 text-lg bg-white focus:bg-gray-50 focus:ring-1 ring-blue-700"
                          type="text"
                          name=""
                          id=""
                          onChange={(e) =>
                            setOTPinput([
                              e.target.value,
                              OTPinput[1],
                              OTPinput[2],
                              OTPinput[3],
                            ])
                          }
                        ></input>
                      </div>
                      <div className="w-16 h-16 ">
                        <input
                          maxLength="1"
                          className="w-full h-full flex flex-col items-center justify-center text-center px-5 outline-none rounded-xl border border-gray-200 text-lg bg-white focus:bg-gray-50 focus:ring-1 ring-blue-700"
                          type="text"
                          name=""
                          id=""
                          onChange={(e) =>
                            setOTPinput([
                              OTPinput[0],
                              e.target.value,
                              OTPinput[2],
                              OTPinput[3],
                            ])
                          }
                        ></input>
                      </div>
                      <div className="w-16 h-16 ">
                        <input
                          maxLength="1"
                          className="w-full h-full flex flex-col items-center justify-center text-center px-5 outline-none rounded-xl border border-gray-200 text-lg bg-white focus:bg-gray-50 focus:ring-1 ring-blue-700"
                          type="text"
                          name=""
                          id=""
                          onChange={(e) =>
                            setOTPinput([
                              OTPinput[0],
                              OTPinput[1],
                              e.target.value,
                              OTPinput[3],
                            ])
                          }
                        ></input>
                      </div>
                      <div className="w-16 h-16 ">
                        <input
                          maxLength="1"
                          className="w-full h-full flex flex-col items-center justify-center text-center px-5 outline-none rounded-xl border border-gray-200 text-lg bg-white focus:bg-gray-50 focus:ring-1 ring-blue-700"
                          type="text"
                          name=""
                          id=""
                          onChange={(e) =>
                            setOTPinput([
                              OTPinput[0],
                              OTPinput[1],
                              OTPinput[2],
                              e.target.value,
                            ])
                          }
                        ></input>
                      </div>
                    </div>

                    <div className="flex flex-col space-y-5">
                      <div>
                        <a
                          onClick={() => verfiyOTP()}
                          className="flex flex-row cursor-pointer items-center justify-center text-center w-full border rounded-xl outline-none py-5 bg-blue-700 border-none text-white text-sm shadow-sm"
                        >
                          Verificar conta
                        </a>
                      </div>

                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div> */}

      </section>
      <footer id="rodape">
        <div class="row">
          <div class="col-lg-12" id="copyright">
            <p><i class="far fa-copyright"></i> Copyright PUC MINAS 2023</p>
          </div>
        </div>
      </footer>
    </div>


  );
}
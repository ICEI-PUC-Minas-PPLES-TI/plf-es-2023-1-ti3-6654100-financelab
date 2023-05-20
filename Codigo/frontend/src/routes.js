import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Login from './pages/Login/login'
import Home from './pages/Home/home'
import Cadastro from './pages/Cadastro/cadastro'
import Investimento from './pages/Investimento/investimento'
import TrocarSenha from './pages/TrocarSenha/trocarSenha'
import TipoInvestimento from './pages/TipoInvestimento/tipoInvestimento'
import InvestimentoDois from './pages/Investimento2'

export default function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/"  element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/investimento" element={<Investimento />} />
        <Route path="/tipo/investimento" element={<TipoInvestimento />} />
        <Route path="/investimento2" element={<InvestimentoDois />} />
        <Route path="/cadastro" element={<Cadastro />} />
        <Route path="/trocarSenha" element={<TrocarSenha />} />
      </Routes>
    </BrowserRouter>
  )
}

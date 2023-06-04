import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Login from './pages/Login/login'
import Home from './pages/Home/home'
import Cadastro from './pages/Cadastro/cadastro'
import TrocarSenha from './pages/TrocarSenha/trocarSenha'
import TipoInvestimento from './pages/TipoInvestimento/tipoInvestimento'
import Investimentos from './pages/Investimentos/index'
import Dashboard from './pages/Dashboard/dashboard'
import Acoes from './pages/Acoes/index'

export default function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/"  element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/tipoInvestimento" element={<TipoInvestimento />} />
        <Route path="/investimentos" element={<Investimentos />} />
        <Route path="/cadastro" element={<Cadastro />} />
        <Route path="/trocarSenha" element={<TrocarSenha />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/acoes" element={<Acoes />} />
      </Routes>
    </BrowserRouter>
  )
}

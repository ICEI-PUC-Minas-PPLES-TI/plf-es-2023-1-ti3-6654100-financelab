import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Login from './pages/Login/login'
import Home from './pages/Home/home'
import Cadastro from './pages/Cadastro/cadastro'
import TrocarSenha from './pages/TrocarSenha/trocarSenha'
import Otp from './pages/TrocarSenha/OTP'

export default function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" exact element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/cadastro" element={<Cadastro />} />
        <Route path="/otp" element={<Otp />} />
        <Route path="/trocarSenha" element={<TrocarSenha />} />
      </Routes>
    </BrowserRouter>
  )
}

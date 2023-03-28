import React, { useState } from 'react';
import Login from './pages/Login/login';
import Home from './pages/Home/home';
import Cadastro from './pages/Cadastro/cadastro';


import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";




function App() {

  let [render, setRender] = useState(0)
  return (
    <>
      {/* This is the alias of BrowserRouter i.e. Router */}
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/cadastro" element={<Cadastro />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;

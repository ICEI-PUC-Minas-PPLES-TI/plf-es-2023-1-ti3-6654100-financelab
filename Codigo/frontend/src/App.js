import React, { useState } from 'react';
import Login from './pages/Login/login';
import Home from './pages/Home/home';

function App() {

  let [render, setRender] = useState(0)
  return (
    <Login/>
  );
}

export default App;

import React from 'react';
import Register from './Register';
import Login from './Login';
import { BrowserRouter, Routes, Route, } from "react-router-dom";
import Home from './Home';
import GoogleButton from './components/GoogleButton';

function App() {

  return (
    <main className="App">
        <BrowserRouter>
          <Routes>
            <Route path="/Home" element={<Home />} />
            <Route path="/" element={<Home />} />
            <Route path='/Register' element={<Register />} />
            <Route path='/Login' element={<Login />} />
          </Routes>
        </BrowserRouter>
    </main>
    
  );
}

export default App;
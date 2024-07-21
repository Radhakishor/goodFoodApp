import React, { useState } from 'react';
import './App.css';
import Home from './screens/Home';
import Login from './screens/Login';
import Signup from './screens/Signup';
import Cart from './screens/Cart'; // Import Cart component
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css'; // Import Bootstrap CSS
import 'bootstrap/dist/js/bootstrap.bundle.min.js'; // Import Bootstrap JavaScript bundle

function App() {
  const [cart, setCart] = useState([]);

  return (
    <Router>
      <div>
        <Routes>
          <Route path='/' element={<Navigate to="/login" />} />
          <Route path='/login' element={<Login />} />
          <Route path='/home' element={<Home cart={cart} setCart={setCart} />} />
          <Route path='/signup' element={<Signup />} />
          <Route path='/cart' element={<Cart cart={cart} />} /> {/* Add cart route */}
        </Routes>
      </div>
    </Router>
  );
}

export default App;

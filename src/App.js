import React, { useState, useEffect } from 'react';
import './App.css';
import Home from './screens/Home';
import Login from './screens/Login';
import Signup from './screens/Signup';
import Cart from './screens/Cart';
import PrivateRoute from './components/PrivateRoute'; // Import PrivateRoute
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';

function App() {
  const [cart, setCart] = useState([]);
  const [isLoggedIn, setIsLoggedIn] = useState(!!localStorage.getItem("authToken")); // Initialize login status based on token

  useEffect(() => {
    // Update login status based on token
    setIsLoggedIn(!!localStorage.getItem("authToken"));
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("authToken");
    setIsLoggedIn(false);
  };

  return (
    <Router>
      <Routes>
        <Route path='/' element={<Navigate to="/login" />} />
        <Route path='/login' element={<Login />} />
        <Route path='/signup' element={<Signup />} />

        {/* Protected routes */}
        <Route element={<PrivateRoute isLoggedIn={isLoggedIn} />}>
          <Route path='/home' element={<Home cart={cart} setCart={setCart} isLoggedIn={isLoggedIn} handleLogout={handleLogout} />} />
          <Route path='/cart' element={<Cart cart={cart} handleLogout={handleLogout} isLoggedIn={isLoggedIn} />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;

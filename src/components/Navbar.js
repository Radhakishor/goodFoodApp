import React from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import { Link } from 'react-router-dom';

export default function Navbar({ isLoggedIn, handleLogout, cartItemCount, currentPage }) {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-success">
      <div className="container-fluid d-flex align-items-center">
        <Link className="navbar-brand fs-3 fs-t fst-italic" to="/home">GoodFood</Link>
        
        {isLoggedIn && (
          <>
            <Link className={`nav-link text-white ${currentPage === 'home' ? 'active' : ''}`} to="/home" style={{ marginLeft: '10px' }}>Home</Link>
            <Link className={`nav-link text-white ${currentPage === 'cart' ? 'active' : ''}`} to="/cart" style={{ marginLeft: '10px' }}>Cart <span className="badge bg-primary">{cartItemCount}</span></Link>
          </>
        )}
        
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
          <ul className="navbar-nav ms-auto">
            {!isLoggedIn ? (
              <>
                <li className='nav-item'>
                  <Link className="nav-link" to="/login">Login</Link>
                </li>
                <li className='nav-item'>
                  <Link className="nav-link" to="/signup">SignUp</Link>
                </li>
              </>
            ) : (
              <li className='nav-item'>
                <button className="nav-link btn btn-link" onClick={handleLogout}>Logout</button>
              </li>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
}

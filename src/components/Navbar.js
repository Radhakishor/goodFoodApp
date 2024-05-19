import React from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import { Link } from 'react-router-dom';

export default function Navbar() {
  return (
    <div>
      <nav className="navbar navbar-expand-lg navbar-dark bg-success">
        <div className="container-fluid">
          <Link className="navbar-brand fs-3 fs-t fst-italic" to="/">GoodFood</Link>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
            <ul className="navbar-nav">
              <li className='nav-item'>
                <Link className="nav-link " aria-current="page" to="/">Home</Link>
              </li>
              <li className='nav-item'>
                <Link className="nav-link" to="/login">Login</Link>
              </li>
              <li className='nav-item'>
                <Link className="nav-link" to="/createuser">SignUp</Link>
              </li>
            </ul>

          </div>
        </div>
      </nav>
    </div>
  )
}
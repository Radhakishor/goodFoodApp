import React from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const Cart = ({ cart = [], handleLogout, isLoggedIn }) => {
  // Calculate total price
  const totalPrice = cart.reduce((total, item) => total + item.price * item.quantity, 0);

  return (
    <div>
      <Navbar isLoggedIn={isLoggedIn} handleLogout={handleLogout} cartItemCount={cart.length} currentPage="cart" />
      
      <div className="container mt-4">
        <h2>Your Cart</h2>
        {cart.length === 0 ? (
          <p>Your cart is empty.</p>
        ) : (
          <>
            <ul className="list-group mb-4">
              {cart.map((item, index) => (
                <li key={index} className="list-group-item d-flex justify-content-between align-items-center">
                  <div>
                    <h5 className="mb-1">{item.foodName}</h5>
                    <p className="mb-1">Option: {item.option}</p>
                    <p className="mb-1">Customization: {item.customization}</p>
                  </div>
                  <div>
                    <span className="badge bg-primary rounded-pill me-2">Quantity: {item.quantity}</span>
                    <span className="badge bg-secondary rounded-pill">Price: ${item.price.toFixed(2)}</span>
                  </div>
                </li>
              ))}
            </ul>
            <h3>Total Price: ${totalPrice.toFixed(2)}</h3>
          </>
        )}
      </div>
      
      <Footer />
    </div>
  );
}

export default Cart;

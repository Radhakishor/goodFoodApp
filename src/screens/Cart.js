import React from 'react';

const Cart = ({ cart = [] }) => {
  return (
    <div className="container mt-4">
      <h2>Your Cart</h2>
      {cart.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <ul className="list-group">
          {cart.map((item, index) => (
            <li key={index} className="list-group-item d-flex justify-content-between align-items-center">
              {item.foodName}
              <span className="badge bg-primary rounded-pill">{item.quantity}</span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default Cart;

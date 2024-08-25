
import React, { useState } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const Checkout = ({ cart, setCart, handleLogout, isLoggedIn, setCartItemCount }) => {
  const [address, setAddress] = useState('');
  const [paymentMethod, setPaymentMethod] = useState('');
  const [orderConfirmed, setOrderConfirmed] = useState(false);

  // Calculate total price
  const totalPrice = cart.reduce((total, item) => total + item.price, 0);

  const handleAddressChange = (e) => {
    setAddress(e.target.value);
  };

  const handlePaymentChange = (e) => {
    setPaymentMethod(e.target.value);
  };

  const handleConfirmOrder = () => {
    // Clear the cart
    setCart([]);
    // Update cart item count to 0
    setCartItemCount(0);
    // Confirm the order
    alert("Order confirmed!");
    setOrderConfirmed(true);
  };

  return (
    <div>
      <Navbar isLoggedIn={isLoggedIn} handleLogout={handleLogout} cartItemCount={0} currentPage="checkout" />
      <div className="container mt-4">
        <h2>Checkout</h2>
        {orderConfirmed ? (
          <div className="alert alert-success">
            Your order has been confirmed. Thank you for shopping with us!
          </div>
        ) : (
          <>
            <h3>Order Summary</h3>
            <ul className="list-group mb-4">
              {cart.map((item, index) => (
                <li key={index} className="list-group-item d-flex justify-content-between align-items-center">
                  <div>
                    <h5 className="mb-1">{item.foodName}</h5>
                    <p className="mb-1">Option: {item.option}</p>
                    <p className="mb-1">Customization: {item.customization}</p>
                  </div>
                  <div className="d-flex align-items-center">
                    <span className="badge bg-primary rounded-pill me-2">Quantity: {item.quantity}</span>
                    <span className="badge bg-secondary rounded-pill">Price: ${Number(item.price).toFixed(2)}</span>
                  </div>
                </li>
              ))}
            </ul>
            <h4>Total Price: ${totalPrice.toFixed(2)}</h4>
            <div className="mb-3">
              <h4>Delivery Location</h4>
              <input 
                type="text" 
                className="form-control" 
                placeholder="Enter your address" 
                value={address}
                onChange={handleAddressChange}
              />
            </div>
            <div className="mb-3">
              <h4>Payment Method</h4>
              <select className="form-select" value={paymentMethod} onChange={handlePaymentChange}>
                <option value="" disabled>Select payment method</option>
                <option value="credit-card">Credit Card</option>
                <option value="paypal">PayPal</option>
                <option value="cash">Cash on Delivery</option>
              </select>
            </div>
            <button className="btn btn-success" onClick={handleConfirmOrder}>Confirm Order</button>
          </>
        )}
      </div>
      <Footer />
    </div>
  );
};

export default Checkout;

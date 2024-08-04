import React from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const Cart = ({ cart = [], setCart, handleLogout, isLoggedIn }) => {
  // Calculate total price
  const totalPrice = cart.reduce((total, item) => total + item.price, 0);

  const handleIncrement = (index) => {
    const updatedCart = [...cart];
    const item = updatedCart[index];
    const unitPrice = item.price / item.quantity; // Price per unit
    item.quantity += 1;
    item.price = unitPrice * item.quantity; // Recalculate price

    setCart(updatedCart);
  };

  const handleDecrement = (index) => {
    const updatedCart = [...cart];
    const item = updatedCart[index];
    if (item.quantity > 1) {
      const unitPrice = item.price / item.quantity; // Price per unit
      item.quantity -= 1;
      item.price = unitPrice * item.quantity; // Recalculate price
      setCart(updatedCart);
    } else {
      updatedCart.splice(index, 1); // Remove the item from the cart
      setCart(updatedCart);
    }
  };

  const handleCheckout = () => {
    alert("Proceed to Checkout clicked!");
  };

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
                  <div className="d-flex align-items-center">
                    <button className="btn btn-danger me-2" onClick={() => handleDecrement(index)}>-</button>
                    <span className="badge bg-primary rounded-pill me-2">Quantity: {item.quantity}</span>
                    <button className="btn btn-success me-2" onClick={() => handleIncrement(index)}>+</button>
                    <span className="badge bg-secondary rounded-pill">Price: ${Number(item.price).toFixed(2)}</span>
                  </div>
                </li>
              ))}
            </ul>
            <h3>Total Price: ${totalPrice.toFixed(2)}</h3>
            <button className="btn btn-success" onClick={handleCheckout}>Proceed to Checkout</button>
          </>
        )}
      </div>
      <Footer />
    </div>
  );
}

export default Cart;

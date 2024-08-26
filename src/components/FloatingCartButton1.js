import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.css';
import './FloatingCartButton1.css'; // Import the CSS file for the floating button

const FloatingCartButton = ({ cart, showBlink }) => {
    const navigate = useNavigate();

    const handleClick = () => {
        navigate('/cart');
    };

    useEffect(() => {
        let timer;
        if (showBlink) {
            timer = setTimeout(() => {
                // Stop blinking after 5 seconds
            }, 5000);
        }
        return () => clearTimeout(timer); // Cleanup timer on unmount
    }, [showBlink]);

    if (cart.length === 0) {
        return null; // Do not render if the cart is empty
    }

    return (
        <button
            className={`btn btn-success rounded-circle position-fixed ${showBlink ? 'blink-border' : ''}`}
            style={{
                bottom: '20px',
                right: '20px',
                width: '60px',
                height: '60px',
                fontSize: '24px',
                boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
            }}
            onClick={handleClick}
        >
            🛒
        </button>
    );
};

export default FloatingCartButton;

import React, { useState, useEffect } from "react";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import 'bootstrap/dist/css/bootstrap.css';
import Card from "../components/Card";
import { useNavigate } from 'react-router-dom';
import FloatingCartButton from "../components/FloatingCartButton1"; // Import the FloatingCartButton

export default function Home({ cart, setCart }) {
    const [search, setSearch] = useState("");
    const [foodCat, setFoodCat] = useState([]);
    const [foodItem, setFoodItem] = useState([]);
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [showBlink, setShowBlink] = useState(false); // State to control the blinking
    let navigate = useNavigate();

    const loadData = async () => {
        try {
            let response = await fetch('http://localhost:5000/api/foodData', {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            if (!response.ok) {
                throw new Error('Failed to fetch data');
            }
            response = await response.json();
            setFoodItem(response[0] || []);
            setFoodCat(response[1] || []);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    }

    useEffect(() => {
        loadData();
        if (localStorage.getItem("authToken")) {
            setIsLoggedIn(true);
        }
    }, []);

    const handleLogout = () => {
        localStorage.removeItem("authToken");
        setIsLoggedIn(false);
        navigate("/login");
    }

    const handleNextPrev = (direction) => {
        const carousel = document.getElementById('carouselExampleControls');
        if (direction === 'next') {
            carousel.querySelector('.carousel-control-next').click();
        } else if (direction === 'prev') {
            carousel.querySelector('.carousel-control-prev').click();
        }
    };

    useEffect(() => {
        const interval = setInterval(() => {
            handleNextPrev('next');
        }, 5000);

        return () => {
            clearInterval(interval);
        };
    }, []);

    const addToCart = (item) => {
        const key = `${item.foodName}-${item.option}`;
        const existingItemIndex = cart.findIndex(cartItem => `${cartItem.foodName}-${cartItem.option}` === key);
    
        if (existingItemIndex !== -1) {
            const updatedCart = [...cart];
            const existingItem = updatedCart[existingItemIndex];
            
            existingItem.quantity += item.quantity;
            const unitPrice = existingItem.price / (existingItem.quantity - item.quantity);
            existingItem.price = unitPrice * existingItem.quantity;
            
            updatedCart[existingItemIndex] = existingItem;
            setCart(updatedCart);
        } else {
            item.price = item.price * item.quantity;
            setCart([...cart, item]);
        }

        setShowBlink(true); // Start blinking effect
        setTimeout(() => setShowBlink(false), 5000); // Stop blinking after 5 seconds
    };

    return (
        <div>
            <div>
            <Navbar isLoggedIn={isLoggedIn} handleLogout={handleLogout} cartItemCount={cart.length} />
            <div id="carouselExampleControls" className="carousel slide" data-bs-ride="carousel">
                {/* ... existing carousel code */}
                <div className="carousel-inner">
                    <div className="carousel-caption" style={{ zIndex: '10' }}>
                        <div className="d-flex justify-content-center">
                            <input 
                                className="form-control me-2" 
                                type="search" 
                                placeholder="Search" 
                                aria-label="Search" 
                                value={search} 
                                onChange={(e) => { setSearch(e.target.value) }} 
                            />
                        </div>
                    </div>
                    <div className="carousel-item">
                        <img src="https://st2.depositphotos.com/1027198/9484/i/950/depositphotos_94849016-stock-photo-one-pot-pasta.jpg" className="d-block w-100" alt="Pasta" style={{ maxHeight: '450px' }} />
                    </div>
                    <div className="carousel-item">
                        <img src="https://www.licious.in/blog/wp-content/uploads/2016/07/Biryani-768x466.jpg" className="d-block w-100" alt="Biryani" style={{ maxHeight: '450px' }} />
                    </div>
                    <div className="carousel-item active">
                        <img src="https://media.istockphoto.com/id/938742222/photo/cheesy-pepperoni-pizza.jpg?s=1024x1024&w=is&k=20&c=OKXH55QwDa6L3cY2pTTz1DKVT2clqW3zcVaJVaU-N_U=" className="d-block w-100" alt="Pizza" style={{ maxHeight: '450px' }} />
                    </div>
                </div>
                <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleControls" data-bs-slide="prev" onClick={() => handleNextPrev('prev')}>
                    <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                    <span className="visually-hidden">Previous</span>
                </button>
                <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleControls" data-bs-slide="next" onClick={() => handleNextPrev('next')}>
                    <span className="carousel-control-next-icon" aria-hidden="true"></span>
                    <span className="visually-hidden">Next</span>
                </button>
            </div>
            </div>
            <div className="container mt-4">
                {/* ... existing food categories and items code */}
                {foodCat.length > 0 &&
                    foodCat.map((category) => (
                        <div className="mb-4" key={category._id}>
                            <h2 className="fs-3 m-3">{category.CategoryName}</h2>
                            <div className="row row-cols-1 row-cols-md-3 g-4">
                                {foodItem.length > 0 &&
                                    foodItem.filter(item => 
                                        item.CategoryName === category.CategoryName && 
                                        item.name.toLowerCase().includes(search.toLowerCase())
                                    ).map(item => (
                                        <div key={item._id} className="col">
                                            <Card 
                                                foodName={item.name} 
                                                options={item.options} 
                                                imgSrc={item.img} 
                                                addToCart={addToCart}
                                            />
                                        </div>
                                    ))}
                            </div>
                        </div>
                    ))}
            </div>
            <FloatingCartButton cart={cart} showBlink={showBlink} /> {/* Pass showBlink state */}
            <Footer />
        </div>
    );
}

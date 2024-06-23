import React, { useState, useEffect } from "react";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import 'bootstrap/dist/css/bootstrap.css';
import Card from "../components/Card";
import { useNavigate } from 'react-router-dom';

export default function Home() {
    const [search, setSearch] = useState("");
    const [foodCat, setFoodCat] = useState([]);
    const [foodItem, setFoodItem] = useState([]);
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    let navigate = useNavigate();

    const loadData = async () => {
        let response = await fetch('http://localhost:5000/api/foodData', {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            }
        });
        response = await response.json();
        setFoodItem(response[0]);
        setFoodCat(response[1]);
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
        navigate("/login"); // Redirect to login page after logout
    }

    return (
        <div>
            <Navbar isLoggedIn={isLoggedIn} handleLogout={handleLogout} />
            <div id="carouselExampleControls" className="carousel slide" data-bs-ride="carousel">
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
                    <div className="carousel-item active">
                        <img src="https://st2.depositphotos.com/1027198/9484/i/950/depositphotos_94849016-stock-photo-one-pot-pasta.jpg" className="d-block" alt="..." style={{ height: '450px', width: '99%' }} />
                    </div>
                    {/* Add more carousel items here if needed */}
                </div>
                <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleControls" data-bs-slide="prev">
                    <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                    <span className="visually-hidden">Previous</span>
                </button>
                <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleControls" data-bs-slide="next">
                    <span className="carousel-control-next-icon" aria-hidden="true"></span>
                    <span className="visually-hidden">Next</span>
                </button>
            </div>
            <div className="container">
                {foodCat.length > 0 ?
                    foodCat.map((data) => {
                        return (
                            <div className="row mb-3" key={data._id}>
                                <div className="fs-3 m-3">
                                    <h2>{data.CategoryName}</h2>
                                </div>
                                {foodItem.length > 0 ?
                                    foodItem.filter((item) => (item.CategoryName === data.CategoryName) && (item.name.toLowerCase().includes(search.toLowerCase())))
                                        .map(filterItems => {
                                            return (
                                                <div key={filterItems._id} className="col-12 col-md-6 col-lg-3">
                                                    <Card foodName={filterItems.name}
                                                        options={filterItems.options}
                                                        imgSrc={filterItems.img}
                                                    />
                                                </div>
                                            )
                                        })
                                    : <div>No such data found</div>}
                            </div>
                        )
                    }) : ""
                }
            </div>
            <Footer />
        </div>
    )
}

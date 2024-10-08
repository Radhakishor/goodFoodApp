import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate hook

export default function Card(props) {
    const [quantity, setQuantity] = useState(0);
    const [selectedOption, setSelectedOption] = useState("");
    const [customization, setCustomization] = useState("");
    const [showOptions, setShowOptions] = useState(false);
    const [buttonText, setButtonText] = useState("Add to Cart"); // New state for button text
    const navigate = useNavigate(); // Initialize useNavigate hook

    const incrementQuantity = () => {
        setQuantity(prevQuantity => Math.min(prevQuantity + 1, 10)); // Set upper limit to 10
    };

    const decrementQuantity = () => {
        setQuantity(prevQuantity => Math.max(prevQuantity - 1, 0)); // Set lower limit to 0
        if (quantity === 1) {
            setShowOptions(false); // Hide options if quantity goes back to 0
            setSelectedOption(""); // Clear selected option if quantity goes back to 0
        }
    };

    const handleOptionChange = (event) => {
        setSelectedOption(event.target.value);
    };

    const handleCustomizationChange = (event) => {
        setCustomization(event.target.value);
    };

    const handleAddToCart = () => {
        if (selectedOption && quantity > 0) {
            const itemPrice = props.options[0][selectedOption]; // Price per unit 
            const item = {
                _id: props.id,
                foodName: props.foodName,
                option: selectedOption,
                quantity: quantity,
                customization: customization,
                price: itemPrice 
            };
            props.addToCart(item);
            setQuantity(0);
            setSelectedOption("");
            setCustomization("");
            setShowOptions(false);
            setButtonText("View Cart"); // Change button text to "View Cart"
            
            // Revert back to "Add to Cart" after 5 seconds
            setTimeout(() => {
                setButtonText("Add to Cart");
            }, 5000);
        } else {
            alert("Please select a size option and quantity.");
        }
    };

    const handleButtonClick = () => {
        if (buttonText === "View Cart") {
            navigate("/cart"); // Navigate to the cart page
        } else {
            handleShowOptions();
        }
    };

    const handleShowOptions = () => {
        setShowOptions(true);
        setQuantity(1);
    };

    let options = props.options[0]; // Assuming options is an array with one object
    let priceOptions = options ? Object.keys(options) : [];

    return (
        <div>
            <div className="card mt-3" style={{ width: "18rem", maxHeight: "500px" }}>
                <img src={props.imgSrc} className="card-img-top m-3" alt="..." style={{ height: '200px', width: '250px' }} />
                <div className="card-body row">
                    <h5 className="card-title">{props.foodName}</h5>
                    <div className="col-md-7">
                        {!showOptions && (
                            <button className="btn btn-primary mt-2" onClick={handleButtonClick}>{buttonText}</button>
                        )}
                        {showOptions && (
                            <>
                                <select className="form-select m-2" onChange={handleOptionChange} value={selectedOption}>
                                    <option value="" disabled>Select size</option>
                                    {priceOptions.map((key) => (
                                        <option key={key} value={key}>{key}</option>
                                    ))}
                                </select>
                                <input
                                    type="text"
                                    className="form-control"
                                    placeholder="Add customization"
                                    value={customization}
                                    onChange={handleCustomizationChange}
                                />
                                <div className="d-flex justify-content-between align-items-center mt-2">
                                    <button className="btn btn-danger" onClick={decrementQuantity}>-</button>
                                    <span>{quantity}</span>
                                    <button className="btn btn-success" onClick={incrementQuantity}>+</button>
                                </div>
                                <button className="btn btn-primary mt-2" onClick={handleAddToCart}>Confirm Add to Cart</button>
                            </>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}

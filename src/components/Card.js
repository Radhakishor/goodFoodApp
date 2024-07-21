import React, { useState } from "react";

export default function Card(props) {
    const [quantity, setQuantity] = useState(0);
    const [selectedOption, setSelectedOption] = useState("");
    const [customization, setCustomization] = useState("");
    const [showOptions, setShowOptions] = useState(false);

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
            const item = {
                _id: props.id, // ensure you have the _id prop passed to Card component
                name: props.foodName,
                option: selectedOption,
                quantity: quantity,
                customization: customization,
                price: props.options[0][selectedOption] * quantity
            };
            props.addToCart(item);
            setQuantity(0);
            setSelectedOption("");
            setCustomization("");
            setShowOptions(false);
        } else {
            alert("Please select a size option and quantity.");
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
                            <button className="btn btn-primary mt-2" onClick={handleShowOptions}>Add to Cart</button>
                        )}
                        {showOptions && (
                            <>
                                <select className="form-select m-2" onChange={handleOptionChange} value={selectedOption}>
                                    <option value="" disabled>Select Size</option>
                                    {priceOptions.map((option) => (
                                        <option key={option} value={option}>
                                            {option} : ${options[option]}
                                        </option>
                                    ))}
                                </select>
                                
                                <div className="container d-flex align-items-center mb-3">
                                    <button className="btn btn-danger" onClick={decrementQuantity}>-</button>
                                    <input
                                        type="text"
                                        className="form-control text-center mx-2"
                                        value={quantity}
                                        readOnly
                                        style={{ width: '50px' }}
                                    />
                                    <button className="btn btn-success" onClick={incrementQuantity}>+</button>
                                </div>

                                
                                <input 
                                    type="text" 
                                    className="form-control m-2" 
                                    placeholder="Customization (optional)" 
                                    value={customization} 
                                    onChange={handleCustomizationChange} 
                                />
                            </>
                        )}
                    </div>
                    <div className="col-md-5">
                        {selectedOption && quantity > 0 && (
                            <>
                                <h6>Total price: ${options[selectedOption] * quantity}</h6>
                                <button className="btn btn-primary mt-2" onClick={handleAddToCart}>Confirm Add to Cart</button>
                            </>
                        )}
                    </div>
                </div>
            </div>
        </div>
    )
}

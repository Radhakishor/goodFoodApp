import React, { useState } from 'react';
import Navbar from '../components/Navbar';
import { Link, useNavigate } from 'react-router-dom';

export default function Signup() {
    let navigate = useNavigate();
    const [credentials, setCredentials] = useState({ name: "", email: "", password: "", geolocation: "" });
    const [errors, setErrors] = useState({ name: "", email: "", password: "", geolocation: "" });
    const [error, setError] = useState("");

    const validateForm = () => {
        let valid = true;
        let newErrors = { name: "", email: "", password: "", geolocation: "" };

        if (!credentials.name) {
            newErrors.name = "Name is required";
            valid = false;
        }
        if (!credentials.email) {
            newErrors.email = "Email is required";
            valid = false;
        } else if (!/\S+@\S+\.\S+/.test(credentials.email)) {
            newErrors.email = "Email is invalid";
            valid = false;
        }
        if (!credentials.password) {
            newErrors.password = "Password is required";
            valid = false;
        } else if (credentials.password.length < 5) {
            newErrors.password = "Password must be at least 5 characters long";
            valid = false;
        }
        if (!credentials.geolocation) {
            newErrors.geolocation = "Address is required";
            valid = false;
        }

        setErrors(newErrors);
        return valid;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!validateForm()) {
            return;
        }

        try {
            const response = await fetch('http://127.0.0.1:5000/api/CreateUser', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    name: credentials.name,
                    email: credentials.email,
                    password: credentials.password,
                    location: credentials.geolocation
                })
            });
            const json = await response.json();

            if (!json.success) {
                throw new Error("User already exists. Please log in.");
            }

            localStorage.setItem("authToken", json.authToken);
            navigate('/home');
        } catch (error) {
            setError(error.message);
        }
    }

    const handleChange = (event) => {
        setCredentials({ ...credentials, [event.target.name]: event.target.value });
        setErrors({ ...errors, [event.target.name]: "" });
        setError("");
    }

    return (
        <div>
            <Navbar />
            <div className='container'>
                <form onSubmit={handleSubmit}>
                    <div className="form-group col-md-4">
                        <label htmlFor="name" className='form-label'>Name</label>
                        <input type="text" className="form-control" placeholder="Enter name" name='name' value={credentials.name} onChange={handleChange} />
                        {errors.name && <p className="text-danger">{errors.name}</p>}
                    </div>
                    <div className="form-group col-md-4">
                        <label htmlFor="email" className='form-label'>Email address</label>
                        <input type="email" className="form-control" id="exampleInputEmail1" name='email' value={credentials.email} onChange={handleChange} placeholder="Enter email" />
                        {errors.email && <p className="text-danger">{errors.email}</p>}
                    </div>
                    <div className="form-group col-md-4">
                        <label htmlFor="password" className='form-label'>Password</label>
                        <input type="password" className="form-control" id="exampleInputPassword1" placeholder="Password" name='password' value={credentials.password} onChange={handleChange} />
                        {errors.password && <p className="text-danger">{errors.password}</p>}
                    </div>
                    <div className="form-group col-md-4">
                        <label htmlFor="address" className='form-label'>Address</label>
                        <input type="text" className="form-control" placeholder="Enter address" name='geolocation' value={credentials.geolocation} onChange={handleChange} />
                        {errors.geolocation && <p className="text-danger">{errors.geolocation}</p>}
                    </div>
                    <button type="submit" className="m-3 btn btn-primary">Submit</button>
                    <Link to='/login' className='m-3 btn btn-danger'>Already a user</Link>
                    {error && <p className="text-danger">{error}</p>}
                </form>
            </div>
        </div>
    )
}

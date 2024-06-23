import React, { useState } from "react";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import { Link, useNavigate } from "react-router-dom";

export default function Login() {
  let navigate = useNavigate();
  const [credentials, setCredentials] = useState({ email: "", password: "" });
  const [errors, setErrors] = useState({ email: "", password: "" });
  const [error, setError] = useState("");

  const validateForm = () => {
    let valid = true;
    let newErrors = { email: "", password: "" };

    if (!credentials.email) {
      newErrors.email = "Email is required";
      valid = false;
    }
    if (!credentials.password) {
      newErrors.password = "Password is required";
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
      const response = await fetch("http://127.0.0.1:5000/api/loginuser", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: credentials.email,
          password: credentials.password,
        }),
      });
      const json = await response.json();

      if (!json.success) {
        throw new Error(json.errors);
      }

      localStorage.setItem("authToken", json.authToken);
      navigate('/home');
    } catch (error) {
      setError(error.message);
    }
  };

  const handleChange = (event) => {
    setCredentials({ ...credentials, [event.target.name]: event.target.value });
    setErrors({ ...errors, [event.target.name]: "" });
    setError("");
  };

  return (
    <div>
      <Navbar />
      <div className="container">
        <form onSubmit={handleSubmit}>
          <div className="form-group col-md-4">
            <label htmlFor="email" className="form-label">
              Email address
            </label>
            <input
              type="email"
              className="form-control col-md-4"
              id="exampleInputEmail1"
              name="email"
              value={credentials.email}
              onChange={handleChange}
              placeholder="Enter email"
            />
            {errors.email && <p className="text-danger">{errors.email}</p>}
          </div>
          <div className="form-group col-md-4">
            <label htmlFor="password" className="form-label">
              Password
            </label>
            <input
              type="password"
              className="form-control"
              id="exampleInputPassword1"
              placeholder="Password"
              name="password"
              value={credentials.password}
              onChange={handleChange}
            />
            {errors.password && (
              <p className="text-danger">{errors.password}</p>
            )}
          </div>
          <button type="submit" className="m-3 btn btn-primary">
            Submit
          </button>
          <Link to="/signup" className="m-3 btn btn-danger">
            I'm a new user
          </Link>
          {error && <p className="text-danger">{error}</p>}
        </form>
      </div>
      <Footer />
    </div>
  );
}

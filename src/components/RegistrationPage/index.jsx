import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

import "./index.css";

const Signup = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    address: "",
  });

  const [showPassword, setShowPassword] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const validateName =
    formData.name.trim().length >= 5 && formData.name.trim().length <= 60;

  const validateAddress =
    formData.address.trim().length >= 5 &&
    formData.address.trim().length <= 400;

  const validatePassword =
    /^(?=.*[A-Z])(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,16}$/.test(
      formData.password
    );
  const validateEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email);

  const isFormValid =
    validateName && validateEmail && validatePassword && validateAddress;

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMsg("");

    const apiUrl = "https://storehub-backend-wd2r.onrender.com/signup";
    const options = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    };

    try {
      const response = await fetch(apiUrl, options);

      const data = await response.json();

      if (!response.ok) {
        setErrorMsg(data.message);
        return;
      }

      alert(data.message);
      navigate("/login");
    } catch (err) {
      console.log(err);
      setErrorMsg();
    }
  };

  return (
    <div className="bg-conatiner">
      <div className="signup-container flex">
        <img
          src="https://res.cloudinary.com/dr2f4tmgc/image/upload/v1744777713/sginup-img_vg94ue.jpg"
          alt="sigupImg"
          className="signipImg"
        />
        <form className="form" onSubmit={handleSubmit}>
          <h2>Signup</h2>

          {errorMsg && <p className="signup-error">{errorMsg}</p>}

          <label>Name</label>
          <input
            className="styled-input "
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
          />

          <label>Email</label>
          <input
            className="styled-input"
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />

          <label>Password</label>
          <input
            className="styled-input"
            type={showPassword ? "text" : "password"}
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
          />

          <div className="signup-checkbox">
            <input
              type="checkbox"
              id="showSignupPassword"
              checked={showPassword}
              onChange={() => setShowPassword(!showPassword)}
            />
            <label htmlFor="showSignupPassword">Show Password</label>
          </div>

          <label>Address</label>
          <textarea
            className="styled-input text-area"
            name="address"
            value={formData.address}
            onChange={handleChange}
            rows={3}
            required
          />

          <button
            className="signup-button"
            type="submit"
            disabled={!isFormValid}
          >
            Sign Up
          </button>

          <p className="signup-text">
            Already have an account? <Link to="/login">Login</Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Signup;

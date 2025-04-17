import React, { useState } from "react";
import { Link, useNavigate, Navigate } from "react-router-dom";
import Cookies from "js-cookie";
import { useContext } from "react";
import { userContext } from "../../context/context";
import "./index.css";

function Login() {
  const navigate = useNavigate();
  const { setUserRole } = useContext(userContext);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPwd, setShowPwd] = useState(false);
  const [errorP, setErrorP] = useState("");

  const onValidUser = (data) => {
    Cookies.set("jwt_token", data.jwtToken, { expires: 30 });
    Cookies.set("user_role", data.role, { expires: 30 });
    setUserRole(data.role);
    navigate("/");
  };

  const isValid = email.trim().length >= 5 && password.trim().length >= 8;

  const submitForm = async (event) => {
    event.preventDefault();

    setEmail("");
    setErrorP("");
    setPassword("");
    const apiUrl = "https://storehub-backend-wd2r.onrender.com/login";
    const options = {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    };

    try {
      const response = await fetch(apiUrl, options);
      const data = await response.json();
      console.log(data);

      if (response.ok) {
        onValidUser(data);
      } else {
        setErrorP(data.message);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const jwtToken = Cookies.get("jwt_token");

  if (jwtToken) {
    return <Navigate to="/" />;
  }

  return (
    <div className="bg-conatiner">
      <div className="flex">
        <img
          src="https://res.cloudinary.com/dr2f4tmgc/image/upload/v1744707732/Login-img_uyslte.jpg"
          className="login-img"
          alt="Login Image"
        />
        <form onSubmit={submitForm} className="form">
          <label htmlFor="email" className="labels">
            Email
          </label>
          <input
            type="email"
            required
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="styled-input"
          />
          <label htmlFor="pwd" className="labels">
            Password
          </label>
          <input
            type={showPwd ? "text" : "password"}
            id="pwd"
            value={password}
            required
            onChange={(e) => setPassword(e.target.value)}
            className="styled-input"
          />
          <div className="checkbox-con">
            <input
              type="checkbox"
              id="checkbox"
              onChange={() => setShowPwd((prev) => !prev)}
            />
            <label htmlFor="checkbox" className="labels show-label">
              Show Password
            </label>
          </div>
          <button className="login-btn" disabled={!isValid}>
            Login
          </button>
          <p className="signup-text">
            No Account? <Link to="/signup"> Signup</Link>
          </p>
          {errorP && <p className="error-para">{errorP}</p>}
        </form>
      </div>
    </div>
  );
}

export default Login;

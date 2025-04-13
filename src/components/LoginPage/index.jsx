import React, { useState } from "react";
import { Link, useNavigate, Navigate } from "react-router-dom";
import Cookies from "js-cookie";
import "./index.css";

const Login = () => {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const isPasswordValid = password.length >= 8 && password.length <= 16;
  const isFormValid = email.trim() !== "" && isPasswordValid;

  const handleLogin = async (e) => {
    e.preventDefault();
    setErrorMsg("");

    if (!isPasswordValid) {
      setErrorMsg("Password must be 8–16 characters long.");
      return;
    }

    try {
      const response = await fetch(
        "https://storehub-backend-wd2r.onrender.com/login",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email, password }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        setErrorMsg(data.message || "Login failed.");
        return;
      }

      Cookies.set("jwt_token", data.token, { expires: "30d" });
      localStorage.setItem("role", data.role);
      navigate("/");
    } catch (err) {
      setErrorMsg(data.message || "Some thing went wrong");
      console.error(err);
    }
  };

  const jwtToken = Cookies.get("jwt_token");

  if (jwtToken) {
    return <Navigate to="/" />;
  }

  return (
    <div className="login-container">
      <form className="login-box" onSubmit={handleLogin}>
        <h2>Login</h2>

        {errorMsg && <p className="error">{errorMsg}</p>}

        <label>Email</label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="inputs"
          required
        />

        <label>Password</label>
        <input
          type={showPassword ? "text" : "password"}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="inputs"
          required
        />

        <div className="checkbox">
          <input
            type="checkbox"
            id="showPassword"
            checked={showPassword}
            onChange={() => setShowPassword(!showPassword)}
          />
          <label htmlFor="showPassword">Show Password</label>
        </div>

        <button type="submit" disabled={!isFormValid}>
          Log In
        </button>

        <p className="signup-text">
          Don't have an account? <Link to="/signup">Signup</Link>
        </p>
      </form>
    </div>
  );
};

export default Login;

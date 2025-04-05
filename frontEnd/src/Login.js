import React, { useState } from "react";
import "./Login.css";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import GoogleSignInButton from "./components/GoogleSignInButton";

import googleIcon from "./assets/google-icon.png";

function Login() {
  const navigate = useNavigate();

  const [email, setEmail] = useState();
  const [password, setPassword] = useState();

  const [loginData, setLoginData] = useState({
    email: "",
    password: "",
    termsAccepted: false,
  });

  const [errors, setErrors] = useState({});

  const storedUser = JSON.parse(localStorage.getItem("user"));

  const handleChange = (e) => {
    const { name, value } = e.target;
    setLoginData({
      ...loginData,
      [name]: value,
    });
  };

  const validate = () => {
    const newErrors = {};

    if (!loginData.email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/))
      newErrors.email = "Invalid email address";
    if (loginData.password.length < 6)
      newErrors.password = "Password must contain at least 6 characters";
    if (!loginData.termsAccepted)
      newErrors.termsAccepted = "You must accept the terms and privacy policy";

    return newErrors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    axios
      .post("http://localhost:3001/login", { email: email, password: password })
      .then((result) => {
        console.log(result);
        if (result.data === "Success") {
          navigate("/dashboard");
        }
      })
      .catch((error) => console.error(error));

    const validationErrors = validate();

    if (Object.keys(validationErrors).length === 0) {
      if (
        storedUser &&
        storedUser.email === loginData.email &&
        storedUser.password === loginData.password
      ) {
        console.log("Login successful");
        navigate("/dashboard");
      } else {
        setErrors({ general: "Invalid email or password" });
      }
    } else {
      setErrors(validationErrors);
    }
  };

  return (
    <div className="login-container">
      <div className="login-bg">
        <form className="login-form" onSubmit={handleSubmit}>
          <h1 className="login-title">Login to BullsEye</h1>
          <div className="form-group">
            <input
              type="email"
              name="email"
              placeholder="Email Id"
              value={loginData.email}
              onChange={(e) => {
                handleChange(e);
                setEmail(e.target.value);
              }}
              className="input-field"
            />
            {errors.email && <p className="error-message">{errors.email}</p>}
          </div>
          <div className="form-group">
            <input
              type="password"
              name="password"
              placeholder="Password"
              value={loginData.password}
              onChange={(e) => {
                handleChange(e);
                setPassword(e.target.value);
              }}
              className="input-field"
            />
            {errors.password && (
              <p className="error-message">{errors.password}</p>
            )}
          </div>

          {errors.general && <p className="error-message">{errors.general}</p>}
          <button type="submit" className="login-button">
            Log in
          </button>

          <p className="or-text">OR</p>

          <GoogleSignInButton
            onSuccess={(userData) => {
              console.log("Google user:", userData);
              localStorage.setItem("user", JSON.stringify(userData));
              navigate("/dashboard");
            }}
          />

          <p className="signup-text">
            Don't have an account?
            <a onClick={() => navigate("/dashboard")} className="signup-link">
              Sign Up
            </a>
          </p>
        </form>
      </div>
    </div>
  );
}

export default Login;

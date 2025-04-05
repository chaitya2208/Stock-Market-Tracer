import React, { useState } from "react";
import axios from "axios";
import { useNavigate, useLocation } from "react-router-dom";
import "./signup.css";

function OtpVerification() {
  const navigate = useNavigate();
  const location = useLocation();
  const email = location.state?.email || sessionStorage.getItem("otpEmail") || "";
  
  const [otp, setOtp] = useState("");
  const [error, setError] = useState("");

  const handleOtpChange = (e) => {
    setOtp(e.target.value);
  };

  const verifyOtp = async (e) => {
    e.preventDefault();

    console.log("📨 Sending OTP verification request with:", { email, otp }); // Debugging

    try {
      const response = await axios.post("http://localhost:3001/api/verify-otp", {
        email,
        otp: otp.toString(),  // Ensure OTP is sent as a string
      });

      console.log("✅ OTP Verification Response:", response.data); // Debugging

      if (response.data.success) {
        alert("✅ OTP verified successfully! Redirecting to dashboard...");
        navigate("/dashboard"); // Redirect to dashboard
      } else {
        console.log("❌ OTP verification failed:", response.data);
        setError(response.data.message || "Invalid OTP. Please try again.");
      }
    } catch (error) {
      console.error("❌ OTP verification failed:", error.response?.data || error);
      setError(error.response?.data?.message || "Something went wrong. Please try again later.");
    }
};

  
  

  return (
    <div className="signup-container">
      <form className="signup-form" onSubmit={verifyOtp}>
        <h1 className="signup-title">Verify Your OTP</h1>
        <p className="signup-subtitle">Enter the OTP sent to your email</p>
        <div className="form-content">
          <input
            type="text"
            placeholder="Enter OTP"
            value={otp}
            onChange={handleOtpChange}
            className="input-field full-width"
          />
          {error && <p className="error-text">{error}</p>}
          <button type="submit" className="signup-button">Verify OTP</button>
        </div>
      </form>
    </div>
  );
}

export default OtpVerification;
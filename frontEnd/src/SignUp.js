import React, { useState } from "react";
import GoogleSignInButton from "./components/GoogleSignInButton";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./signup.css";
import googleIcon from "./assets/google-icon.png";
import bgImg from "./assets/stock-background-img.jpg";

function SignUp() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    firstname: "",
    lastname: "",
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
    termsAccepted: false,
  });

  const [otpSent, setOtpSent] = useState(false);
  const [otp, setOtp] = useState("");
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    const newValue = type === "checkbox" ? checked : value;
    setFormData({ ...formData, [name]: newValue });

    // Real-time validation for specific fields
    if (
      ["email", "password", "username", "firstname", "lastname"].includes(name)
    ) {
      const fieldErrors = validateField(name, newValue);
      setErrors({ ...errors, [name]: fieldErrors[name] });
    }
  };

  const validateField = (fieldName, value) => {
    const newErrors = {};

    switch (fieldName) {
      case "firstname":
        if (!value.trim()) {
          newErrors.firstname = "First name is required";
        } else if (!/^[A-Za-z\s]{2,50}$/.test(value)) {
          newErrors.firstname = "2-50 letters only";
        }
        break;

      case "lastname":
        if (!value.trim()) {
          newErrors.lastname = "Last name is required";
        } else if (!/^[A-Za-z\s]{2,50}$/.test(value)) {
          newErrors.lastname = "2-50 letters only";
        }
        break;

      case "username":
        if (!value.trim()) {
          newErrors.username = "Username is required";
        } else if (!/^[a-zA-Z0-9_]{4,20}$/.test(value)) {
          newErrors.username = "4-20 chars (letters, numbers, _)";
        }
        break;

      case "email":
        if (!value.trim()) {
          newErrors.email = "Email is required";
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(value)) {
          newErrors.email = "Invalid email format";
        }
        break;

      case "password":
        if (!value) {
          newErrors.password = "Password is required";
        } else if (value.length < 8) {
          newErrors.password = "Minimum 8 characters";
        } else if (
          !/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])/.test(value)
        ) {
          newErrors.password = "Requires upper, lower, number & special char";
        }
        break;

      default:
        break;
    }

    return newErrors;
  };

  const validateForm = () => {
    const newErrors = {
      ...validateField("firstname", formData.firstname),
      ...validateField("lastname", formData.lastname),
      ...validateField("username", formData.username),
      ...validateField("email", formData.email),
      ...validateField("password", formData.password),
    };

    // Confirm Password
    if (!formData.confirmPassword) {
      newErrors.confirmPassword = "Please confirm password";
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = "Passwords don't match";
    }

    // Terms Checkbox
    if (!formData.termsAccepted) {
      newErrors.termsAccepted = "You must accept the terms";
    }

    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formErrors = validateForm();
    setErrors(formErrors);

    if (Object.keys(formErrors).length === 0) {
      otpSent ? await verifyOtpAndSignUp() : await sendOtp();
    }
  };

  const handleGoogleSuccess = (userData) => {
    // Optional: You can console log it
    console.log("Google User:", userData);

    // Save to localStorage
    localStorage.setItem("user", JSON.stringify(userData));

    axios.post("http://localhost:3001/api/google-signup", userData)
    .then(res => {
      console.log("User stored in DB:", res.data);
      console.log("Navigating to dashboard...");
      navigate("/dashboard");
    })
    .catch(err => {
      console.error("Error saving Google user:", err);
    });
  };

  const sendOtp = async () => {
    setIsLoading(true);
    try {
      const response = await axios.post("http://localhost:3001/api/send-otp", {
        email: formData.email,
      });

      if (response.data.success) {
        setOtpSent(true);
        sessionStorage.setItem("otpEmail", formData.email);
        alert("OTP sent to your email!");
      } else {
        setErrors({ api: response.data.message || "Failed to send OTP" });
      }
    } catch (error) {
      setErrors({ api: "Error sending OTP. Please try again." });
      console.error("Error sending OTP:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const verifyOtpAndSignUp = async () => {
    setIsLoading(true);
    try {
      const response = await axios.post(
        "http://localhost:3001/api/verify-otp",
        {
          email: formData.email,
          otp: otp,
          formData,
        }
      );

      if (response.data.success) {
        alert("Signup successful!");
        navigate("/dashboard");
      } else {
        setErrors({ otp: "Invalid OTP" });
      }
    } catch (error) {
      setErrors({ api: "Verification failed. Please try again." });
      console.error("OTP verification failed:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="signup-container">
      <form className="signup-form" onSubmit={handleSubmit}>
        <h1 className="signup-title">Join BullsEye Dashboard</h1>
        <p className="signup-subtitle">Sign Up For Free</p>

        <div className="form-content">
          {!otpSent ? (
            <>
              <input
                type="text"
                name="firstname"
                placeholder="First Name"
                value={formData.firstname}
                onChange={handleChange}
                className={`input-field ${
                  errors.firstname ? "input-error" : ""
                }`}
              />
              {errors.firstname && (
                <p className="error-text">{errors.firstname}</p>
              )}

              <input
                type="text"
                name="lastname"
                placeholder="Last Name"
                value={formData.lastname}
                onChange={handleChange}
                className={`input-field ${
                  errors.lastname ? "input-error" : ""
                }`}
              />
              {errors.lastname && (
                <p className="error-text">{errors.lastname}</p>
              )}

              <input
                type="text"
                name="username"
                placeholder="Username"
                value={formData.username}
                onChange={handleChange}
                className={`input-field full-width ${
                  errors.username ? "input-error" : ""
                }`}
              />
              {errors.username && (
                <p className="error-text">{errors.username}</p>
              )}

              <input
                type="email"
                name="email"
                placeholder="Email"
                value={formData.email}
                onChange={handleChange}
                className={`input-field full-width ${
                  errors.email ? "input-error" : ""
                }`}
              />
              {errors.email && <p className="error-text">{errors.email}</p>}

              <input
                type="password"
                name="password"
                placeholder="Password"
                value={formData.password}
                onChange={handleChange}
                className={`input-field full-width ${
                  errors.password ? "input-error" : ""
                }`}
              />
              {errors.password && (
                <p className="error-text">{errors.password}</p>
              )}

              <input
                type="password"
                name="confirmPassword"
                placeholder="Confirm Password"
                value={formData.confirmPassword}
                onChange={handleChange}
                className={`input-field full-width ${
                  errors.confirmPassword ? "input-error" : ""
                }`}
              />
              {errors.confirmPassword && (
                <p className="error-text">{errors.confirmPassword}</p>
              )}

              <div className="checkbox-container">
                <input
                  type="checkbox"
                  name="termsAccepted"
                  checked={formData.termsAccepted}
                  onChange={handleChange}
                  className={`checkbox ${
                    errors.termsAccepted ? "checkbox-error" : ""
                  }`}
                />
                <p className="checkbox-text">
                  I agree to all Terms and Privacy Policy
                </p>
              </div>
              {errors.termsAccepted && (
                <p className="error-text">{errors.termsAccepted}</p>
              )}

              {errors.api && (
                <p className="error-text api-error">{errors.api}</p>
              )}

              <button
                type="submit"
                className="signup-button"
                disabled={isLoading}
              >
                {isLoading ? "Sending..." : "Send OTP"}
              </button>
            </>
          ) : (
            <>
              <input
                type="text"
                placeholder="Enter OTP"
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
                className={`input-field full-width ${
                  errors.otp ? "input-error" : ""
                }`}
              />
              {errors.otp && <p className="error-text">{errors.otp}</p>}
              {errors.api && (
                <p className="error-text api-error">{errors.api}</p>
              )}

              <button
                type="submit"
                className="signup-button"
                disabled={isLoading}
              >
                {isLoading ? "Verifying..." : "Verify OTP & Sign Up"}
              </button>
            </>
          )}

          <p className="or-text">OR</p>
          <GoogleSignInButton onSuccess={handleGoogleSuccess} />


          <p className="login-text">
            Already have an account?
            <a onClick={() => navigate("/login")} className="login-link">
              {" "}
              Login
            </a>
          </p>
        </div>
      </form>
      <div
        className="signup-image"
        style={{ backgroundImage: `url(${bgImg})` }}
      ></div>
    </div>
  );
}

export default SignUp;

import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import api from "../../api";
import { SpinnerButton } from "../../SpinnerButton";

export function LoginPage() {
  const [EmailID, setEmailID] = useState("");
  const [Password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    try {
      const res = await api.post("/Login", { EmailID, Password });

      if (res.status === 200) {
        console.log("Login successful:", res.data);

        localStorage.setItem("token", res.data.token);
        localStorage.setItem("userId", res.data.userId);

        navigate("/Dashboard");
      }
    } catch (err) {
      console.error("Login error:", err.response?.data || err.message);
      setError(err.response?.data?.message || "Login failed");
    }
  };

  return (
    <div className="LoginWrapper">
      <div className="LoginBox">
        <h1 className="login-h1">Login</h1>
        <form onSubmit={handleSubmit}>
          <label>Email ID:</label>
          <input
            type="email"
            required
            name="EmailID"
            placeholder="Enter your email"
            className="login-input"
            value={EmailID}
            onChange={(e) => setEmailID(e.target.value)}
          />

          <label>Password:</label>
          <div className="password-wrapper">
            <input
              type={showPassword ? "text" : "password"}
              required
              name="Password"
              placeholder="Enter your password"
              className="login-input Login-password-input"
              value={Password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <button
              type="button"
              className="eye-btn"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? <FaEyeSlash /> : <FaEye />}
            </button>
          </div>

          <button type="submit" className="login-btn">
            Submit
          </button>

          {error && <p className="error-text">{error}</p>}

          <p className="signup-text">
            Do not have an existing Account?{" "}
            <Link to="/SignUp" className="signup-link">
              Sign Up
            </Link>
          </p>
          <p className="forgot-text">
            <Link to="/ForgetPassword" className="forgot-link">
              Forgot Password?
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
}

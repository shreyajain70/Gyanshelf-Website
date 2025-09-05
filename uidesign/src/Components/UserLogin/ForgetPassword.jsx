import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import api from "../../api"; // import centralized axios instance

export default function ForgotPassword() {
  const [step, setStep] = useState(1);
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  // Step 1: Send OTP
  const sendOtp = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("OTP is being sent, please wait...");
    try {
      await api.post("/ForgetPassword/forgot-password", { EmailID: email });
      setMessage("✅ OTP sent successfully!");
      setStep(2);
    } catch (err) {
      setMessage(err.response?.data?.message || "❌ Error sending OTP");
    } finally {
      setLoading(false);
    }
  };

  // Step 2: Reset Password
  const resetPassword = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("Resetting password, please wait...");
    try {
      const res = await api.post("/ForgetPassword/reset-password", {
        EmailID: email,
        otp,
        newPassword,
      });
      setMessage("✅ " + res.data.message);
      setTimeout(() => {
        navigate("/Login");
      }, 1500);
    } catch (err) {
      setMessage(err.response?.data?.message || "❌ Error resetting password");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fp-wrapper">
      <div className="fp-box">
        <h1 className="fp-title">🔑 Forgot Password</h1>

        {step === 1 ? (
          <form onSubmit={sendOtp} className="fp-form">
            <div className="fp-group">
              <label>Email ID:</label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="fp-input"
              />
            </div>
            <button type="submit" disabled={loading} className="fp-btn fp-btn-blue">
              {loading ? "Sending..." : "Send OTP"}
            </button>
          </form>
        ) : (
          <form onSubmit={resetPassword} className="fp-form">
            <div className="fp-group">
              <label>OTP:</label>
              <input
                type="text"
                required
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
                className="fp-input"
              />
            </div>
            <div className="fp-group">
              <label>New Password:</label>
              <div className="fp-input-wrapper">
                <input
                  type={showPassword ? "text" : "password"}
                  required
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  className="fp-input"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="eye-btn"
                  style={{ position: "absolute", right: 10, top: "50%", transform: "translateY(-50%)", background: "none", border: "none", cursor: "pointer", color: "#4b5563" }}
                  aria-label={showPassword ? "Hide password" : "Show password"}
                >
                  {showPassword ? (
                    <AiOutlineEyeInvisible size={20} />
                  ) : (
                    <AiOutlineEye size={20} />
                  )}
                </button>
              </div>
            </div>
            <button type="submit" disabled={loading} className="fp-btn fp-btn-green">
              {loading ? "Resetting..." : "Reset Password"}
            </button>
          </form>
        )}

        {message && (
          <p
            className={`fp-message ${
              message.includes("✅")
                ? "fp-success"
                : message.includes("❌")
                ? "fp-error"
                : "fp-info"
            }`}
          >
            {message}
          </p>
        )}
      </div>
    </div>
  );
}

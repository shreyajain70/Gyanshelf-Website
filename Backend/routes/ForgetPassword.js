const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const nodemailer = require("nodemailer");
const bcrypt = require("bcrypt");
const User = require("../models/SignUpSchema"); // your signup schema
require("dotenv").config();

// Gmail transporter (use App Password, not your real password)
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER, // your gmail
    pass: process.env.EMAIL_PASS, // your app password
  },
});

// Step 1: Request OTP
router.post("/forgot-password", async (req, res) => {
  try {
    const { EmailID } = req.body;
    const user = await User.findOne({ EmailID });
    if (!user) return res.status(400).json({ message: "User not found" });

    // Generate OTP (6 digits)
    const otp = Math.floor(100000 + Math.random() * 900000).toString();

    // Save OTP in DB with expiry
    user.resetOTP = otp;
    user.resetOTPExpiry = Date.now() + 10 * 60 * 1000; // valid for 10 mins
    await user.save();

    // Send email
    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: EmailID,
      subject: "Password Reset OTP",
      text: `
Hello,

We received a request to reset your account password. 
Your One-Time Password (OTP) for resetting your password is:

🔑 OTP: ${otp}

⚠️ This OTP will be valid for the next 10 minutes.  
Please do not share this code with anyone for your account's security.

If you did not request a password reset, you can safely ignore this email.

Best regards,  
GyanShelf Support Team
`,
    });

    res.json({ message: "OTP sent to your email" });
  } catch (err) {
    console.error("Forgot password error:", err);
    res.status(500).json({ message: "Server error" });
  }
});

// Step 2: Reset password
router.post("/reset-password", async (req, res) => {
  try {
    const { EmailID, otp, newPassword } = req.body;
    const user = await User.findOne({ EmailID });

    if (!user || user.resetOTP !== otp || user.resetOTPExpiry < Date.now()) {
      return res.status(400).json({ message: "Invalid or expired OTP" });
    }

    // Hash new password
    const hashedPassword = await bcrypt.hash(newPassword, 10);

    user.Password = hashedPassword;
    user.resetOTP = undefined;
    user.resetOTPExpiry = undefined;
    await user.save();

    res.json({ message: "Password reset successful" });
  } catch (err) {
    console.error("Reset password error:", err);
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;

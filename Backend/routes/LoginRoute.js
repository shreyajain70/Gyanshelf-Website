const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const nodemailer = require("nodemailer");
const SignUpSchema = require("../models/SignUpSchema");

const router = express.Router();
require("dotenv").config();

router.post("/", async (req, res) => {
  try {
    const { EmailID, Password } = req.body;

    const EmailUser = await SignUpSchema.findOne({ EmailID });
    if (!EmailUser) {
      return res.status(404).json({ message: "Email user does not exist" });
    }

    const PasswordUser = await bcrypt.compare(Password, EmailUser.Password);
    if (!PasswordUser) {
      return res.status(401).json({ message: "EmailID or Password is Invalid" });
    }

    // ✅ create token
    const token = jwt.sign(
      { _id: EmailUser._id },
      process.env.JWT_SECRET || "fallbackSecret",
      { expiresIn: "1h" }
    );

    // ✅ send email only if first login
    if (EmailUser.firstLogin) {
      const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
          user: process.env.EMAIL_USER,
          pass: process.env.EMAIL_PASS,
        },
      });

      await transporter.sendMail({
        from: `"Gyanshelf" <${process.env.EMAIL_USER}>`,
        to: EmailID,
        subject: "Welcome Back to Gyanshelf 🎉",
        html: `
          <h2>Hi ${EmailUser.Name || "User"},</h2>
          <p>You have successfully logged in to <b>Gyanshelf</b> for the first time.</p>
          <p>We’re glad to have you onboard! 🚀</p>
          <br/>
          <small>If this wasn’t you, please reset your password immediately.</small>
        `,
      });

      // ✅ update firstLogin to false
      EmailUser.firstLogin = false;
      await EmailUser.save();
    }

    res.status(200).json({
      message: "Login Successful",
      token,
      userId: EmailUser._id,
    });
  } catch (err) {
    console.log(err.message);
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;

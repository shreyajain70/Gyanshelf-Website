const express = require("express");
const bcrypt = require("bcrypt");
const SignUpSchema = require("../models/SignUpSchema"); // ✅ use same schema as signup/login

const router = express.Router();

// ✅ Get user profile
router.get("/:id", async (req, res) => {
  try {
    const user = await SignUpSchema.findById(req.params.id).select("-Password");
    if (!user) return res.status(404).json({ error: "User not found" });
    res.json(user);
  } catch (err) {
    console.error("❌ Error fetching user:", err);
    res.status(500).json({ error: "Server error" });
  }
});

// ✅ Update profile
router.put("/:id", async (req, res) => {
  try {
    const updatedUser = await SignUpSchema.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    ).select("-Password");

    if (!updatedUser) return res.status(404).json({ error: "User not found" });
    res.json({ user: updatedUser });
  } catch (err) {
    console.error("❌ Error updating profile:", err);
    res.status(500).json({ error: "Server error" });
  }
});

// ✅ Update password
router.put("/:id/password", async (req, res) => {
  try {
    const { newPassword } = req.body;

    if (!newPassword) {
      return res.status(400).json({ error: "New password is required" });
    }

    const hashedPassword = await bcrypt.hash(newPassword, 10);

    const updatedUser = await SignUpSchema.findByIdAndUpdate(
      req.params.id,
      { Password: hashedPassword },
      { new: true }
    );

    if (!updatedUser) return res.status(404).json({ error: "User not found" });

    res.json({ message: "✅ Password updated successfully" });
  } catch (err) {
    console.error("❌ Error updating password:", err);
    res.status(500).json({ error: "Server error" });
  }
});

module.exports = router;

const express = require("express");
const router = express.Router();
const SignUpSchema = require("../models/SignUpSchema");

// ✅ Get user by ID for Dashboard
router.get("/:id", async (req, res) => {
  try {
    const user = await SignUpSchema.findById(req.params.id).select("-Password");
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }
    res.json(user);
  } catch (err) {
    console.error("❌ Dashboard fetch error:", err);
    res.status(500).json({ error: "Failed to fetch user" });
  }
});

module.exports = router;

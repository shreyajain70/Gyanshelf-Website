// routes/BookDetailsRoute.js
const express = require("express");
const router = express.Router();
const SellSchema = require("../models/SellSchema");

// ✅ Get single book with seller details
router.get("/:id", async (req, res) => {
  try {
    const book = await SellSchema.findById(req.params.id).populate({
      path: "userId",
      model: "SignUpGyanShelf", // ✅ must match the name in SignUpSchema.js
      select: "-Password -__v -createdAt -updatedAt", // hide sensitive fields
    });

    if (!book) {
      return res.status(404).json({ error: "Book not found" });
    }

    res.json(book);
  } catch (err) {
    console.error("❌ Fetch error:", err);
    res.status(500).json({ error: "Failed to fetch book details" });
  }
});

module.exports = router;

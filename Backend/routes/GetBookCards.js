const express = require("express");
const router = express.Router();
const multer = require("multer");
const path = require("path");
const SellSchema = require("../models/SellSchema");


// ====== GET /sell/books ======
router.get("/", async (req, res) => {
  try {
    const books = await SellSchema.find();
    res.json(books);
  } catch (err) {
    console.error("❌ Fetch error:", err);
    res.status(500).json({ error: "Failed to fetch books" });
  }
});



module.exports = router;
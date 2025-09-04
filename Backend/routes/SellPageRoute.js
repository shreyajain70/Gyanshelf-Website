const express = require("express");
const router = express.Router();
const multer = require("multer");
const SellSchema = require("../models/SellSchema");
require("dotenv").config();

const cloudinary = require("cloudinary").v2;
const { CloudinaryStorage } = require("multer-storage-cloudinary");

// Cloudinary config
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// Multer + Cloudinary
const storage = new CloudinaryStorage({
  cloudinary,
  params: async () => ({
    folder: "book_uploads",
    resource_type: "image", // auto-detect format
  }),
});

const upload = multer({ storage });

// POST /api/SellPage/upload
router.post(
  "/upload",
  upload.fields([
    { name: "FrontImage", maxCount: 1 },
    { name: "BackImage", maxCount: 1 },
  ]),
  async (req, res) => {
    try {
      const {
        Title,
        Description,
        Class,
        Board,
        Edition,
        MRP,
        Quality,
        IAgree,
        userId,
      } = req.body;

      // validate fields
      if (
        !Title ||
        !Description ||
        !Class ||
        !Board ||
        !Edition ||
        !MRP ||
        !Quality ||
        !IAgree ||
        !userId
      ) {
        return res.status(400).json({ error: "All fields are required" });
      }

      const isAgreed = IAgree === "true";
      if (!isAgreed) {
        return res.status(400).json({ error: "You must agree before posting" });
      }

      // Cloudinary URLs
      const frontImages = req.files["FrontImage"]?.map((file) => file.path) || [];
      const backImages = req.files["BackImage"]?.map((file) => file.path) || [];

      if (frontImages.length === 0 || backImages.length === 0) {
        return res.status(400).json({ error: "Both front & back images required" });
      }

      // Save book
      const newBook = new SellSchema({
        Title,
        Description,
        Class,
        Board,
        Edition,
        FrontImage: frontImages,
        BackImage: backImages,
        MRP,
        Quality,
        IAgree: isAgreed,
        userId,
      });

      await newBook.save();

      res.json({
        message: "✅ Book uploaded successfully",
        book: newBook,
      });
    } catch (err) {
      console.error("❌ Upload error:", err.message);
      res.status(500).json({ error: "Failed to save book" });
      console.log(err.message)
    }
  }
);

module.exports = router;

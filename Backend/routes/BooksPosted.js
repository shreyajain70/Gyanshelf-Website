// routes/bookRoutes.js
const express = require("express");
const router = express.Router();
const SellSchema = require("../models/SellSchema");

// Route to get books posted by logged-in user
// Assume frontend sends the userId in request header or token (simpler with header here)
router.get("/my-posted-books", async (req, res) => {
    try {
        const userId = req.header("userId"); // you can replace this with token-based auth later
        if (!userId) return res.status(400).json({ message: "User ID not provided" });

        const books = await SellSchema.find({ userId }).sort({ createdAt: -1 });
        res.status(200).json(books);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Server Error" });
    }
});

// DELETE a book posted by user
router.delete("/delete-book/:id", async (req, res) => {
  try {
    const userId = req.header("userId"); // ensure book belongs to the user
    if (!userId) return res.status(400).json({ message: "User ID not provided" });

    const bookId = req.params.id;

    // Check if book belongs to user before deleting
    const book = await SellSchema.findOne({ _id: bookId, userId });
    if (!book) {
      return res.status(404).json({ message: "Book not found or unauthorized" });
    }

    await SellSchema.findByIdAndDelete(bookId);
    res.status(200).json({ message: "Book deleted successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server Error" });
  }
});


module.exports = router;

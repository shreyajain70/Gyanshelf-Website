const express = require("express");
const router = express.Router();
const Cart = require("../models/CartSchema");

// ✅ Add a book to cart
router.post("/cart", async (req, res) => {
  const { userId, bookId } = req.body;

  if (!userId || !bookId) {
    return res.status(400).json({ message: "Missing userId or bookId" });
  }

  try {
    const exists = await Cart.findOne({ userId, bookId });
    if (exists) {
      return res.status(400).json({ message: "Book already in cart" });
    }

    const cartItem = new Cart({ userId, bookId });
    await cartItem.save();

    res.json({ message: "Book added to cart" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to add to cart" });
  }
});

// ✅ Get all cart items for a user
router.get("/cart/:userId", async (req, res) => {
  try {
    const items = await Cart.find({ userId: req.params.userId }).populate({
      path: "bookId",
      model: "SellSchema",
      populate: { path: "userId", model: "SignUpGyanShelf", select: "-Password -__v" },
    });

    // 🚀 Filter out null bookId (e.g., deleted books)
    const validBooks = items
      .map(item => item.bookId)
      .filter(book => book !== null);

    res.json(validBooks);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to fetch cart items" });
  }
});

// ✅ Remove a book from cart
router.delete("/cart/:userId/:bookId", async (req, res) => {
  try {
    await Cart.deleteOne({ userId: req.params.userId, bookId: req.params.bookId });
    res.json({ message: "Book removed from cart" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to remove book from cart" });
  }
});

module.exports = router;

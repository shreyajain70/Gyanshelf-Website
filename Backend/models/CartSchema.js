const mongoose = require("mongoose");

const CartSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "SignUpGyanShelf", required: true },
  bookId: { type: mongoose.Schema.Types.ObjectId, ref: "SellSchema", required: true },
}, { timestamps: true });

module.exports = mongoose.model("Cart", CartSchema);

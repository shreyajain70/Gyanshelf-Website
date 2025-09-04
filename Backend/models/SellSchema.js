// models/SellSchema.js
const mongoose = require("mongoose");

const UserSchema = mongoose.Schema(
  {
    Title: {
      type: String,
      required: true,
      trim: true,
    },
    Description: {
      type: String,
      required: true,
      trim: true,
    },
    Class: {
      type: String,
      required: true,
    },
    Board: {
      type: String,
      required: true,
    },
    Edition: {
      type: String,
      required: true,
    },
    FrontImage: [
      {
        type: String, // Cloudinary URL
        required: true,
      },
    ],
    BackImage: [
      {
        type: String, // Cloudinary URL
        required: true,
      },
    ],
    MRP: {
      type: Number,
      required: true,
      trim: true,
    },
    Quality: {
      type: String,
      required: true,
    },
    IAgree: {
      type: String,
      required: true,
    },
   userId: {
  type: mongoose.Schema.Types.ObjectId,
  ref: "SignUpGyanShelf", // MUST match the model name in SignUpSchema.js
  required: true
}
,
  },
  { timestamps: true }
);

const SellSchema = mongoose.model("SellSchema", UserSchema);
module.exports = SellSchema;

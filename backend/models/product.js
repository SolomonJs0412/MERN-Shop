const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please enter a product name"],
    trim: true,
    maxLength: [500, "Product name can not exceed 100 characters"],
  },
  price: {
    type: Number,
    required: [true, "Please enter a product price"],
    maxLength: [10, "Product name can not exceed 10 characters"],
    default: 0.0,
  },
  description: {
    type: String,
    required: [true, "Please enter a product description"],
  },
  ratings: {
    type: Number,
    default: 0,
  },
  images: [
    {
      public_id: {
        type: String,
        required: true,
      },
      url: {
        type: String,
        required: true,
      },
    },
  ],
  gender: {
    type: String,
    required: [true, "Please enter a product gender"],
    enum: {
      values: ["Male", "Female", "Unisex"],
      message: "Please enter a product gender",
    },
  },
  brand: {
    type: String,
    required: [true, "Please enter a product brand"],
  },
  stock: {
    type: Number,
    required: [true, "Please enter a product stock"],
    maxLength: [5, "Product name can not exceed 5 characters"],
    default: 0,
  },
  numOfReviews: {
    type: Number,
    default: 0,
  },
  reviews: [
    {
      user: {
        type: mongoose.Schema.ObjectId,
        ref: "User",
        required: true,
      },
      name: {
        type: String,
        required: true,
      },
      rating: {
        type: Number,
        required: true,
      },
      comment: {
        type: String,
        required: true,
      },
    },
  ],
  user: {
    type: mongoose.Schema.ObjectId,
    ref: "User",
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
});

module.exports = mongoose.model("Product", productSchema);

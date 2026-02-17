const mongoose = require("mongoose");

const foodSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Food title is required"],
      trim: true,
    },

    description: {
      type: String,
      required: [true, "Food description is required"],
    },

    price: {
      type: Number,
      required: [true, "Food price is required"],
      min: 0,
    },

    imageUrl: {
      type: String,
      default:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSj1o8EVP1S4RpOBMrkRZw0xp7hTvSA63FFjFLJfGH3Mg&s",
    },

    foodTags: {
      type: [String], 
    },

    category: {
      type: String,
      enum: ["Veg Meal", "Dessert", "Drinks", "Fast Food"],
    },

    code: {
      type: String,
      unique: true,
    },

    isAvailable: {
      type: Boolean,
      default: true,
    },

    restaurant: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Resturant",
      required: true,
    },

    rating: {
      type: Number,
      default: 5,
      min: 1,
      max: 5,
    },

    ratingCount: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true },
);

module.exports = mongoose.model("Food", foodSchema);

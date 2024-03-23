const mongoose = require("mongoose");
//user schema for storing user info
const ReviewsSchema = new mongoose.Schema(
  {
    rating: {
      type: Number,
      min: 1,
      max: 5,
      required: [true, "Please provide rating"],
    },
    title: {
      type: String,
      required: [true, "Please provide title"],
    },
    comment: {
      type: String,
      maxlength: 100,
      required: [true, "Please provide comment"],
    },
    user: {
      type: mongoose.Types.ObjectId,
      ref: "User",
      required: true,
    },
    product: {
      type: mongoose.Types.ObjectId,
      ref: "Products",
      required: true,
    },
  },
  { timestamps: true }
);
//*user can add one review per product
ReviewsSchema.index({ product: 1, user: 1 }, { unique: true });

module.exports = mongoose.model("Reviews", ReviewsSchema);

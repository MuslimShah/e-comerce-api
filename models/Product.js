const mongoose = require("mongoose");

const Schema = mongoose.Schema;
//product model
const ProductSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, "must provide a name"],
      trim: true,
      maxlength: [100, "Name cannot exceed 100 characters"],
    },
    price: {
      type: Number,
      required: [true, "must provide product price"],
      default: 0,
    },
    description: {
      type: String,
      required: [true, "must provide product description"],
      maxlength: [2000, "description cannot exceed 2000 characters"],
    },
    image: {
      type: String,
      required: [true, "must provide a picture"],
    },
    category: {
      type: String,
      required: [true, "Must select a category"],
      enum: ["kitchen", "office", "bedroom", "kids"],
    },
    company: {
      type: String,
      required: [true, "must provide company name"],
      enum: {
        values: ["Uniliver", "Nestle", "Pepsi", "Cocacola"],
        message: "{VALUE} is not supported",
      },
    },
    colors: {
      type: [String],
      required: true,
    },
    featured: {
      type: Boolean,
      default: false,
    },
    freeShipping: {
      type: Boolean,
      default: false,
    },
    inventory: {
      type: Number,
      required: true,
      default: 0,
    },
    averegeRating: {
      type: Number,
      default: 0,
    },
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required:true
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Products", ProductSchema);

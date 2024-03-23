const mongoose = require("mongoose");
const Reviews = require("./Reviews");

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
      default: "/uploads/example.jpeg",
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
      required: true,
    },

    /**
   * In order to get reviews of the products in product controller we have to make
   * connection between product and reviews
   * as in reviews we can populate product because we have ref('Products') field there
   * but in Product schema we does not have direct ref to reviews
   * so for this purpose we have to set virtuals
   * !BUT as we know these are virtual document created on the fly --> we will not be able to query it
   * !like get those products whose revews is 5
   * * Alternative approch is directly querying Reviews object by passing object id 
  
  */
  },
  { timestamps: true, toJSON: { virtuals: true }, toObject: { virtuals: true } }
);

/**
 * Here ref refers to the document with whcih we want to establish relation
 * localField refers to the field  that is common in both documents
 * foreignField is the name of this localField in other document
 */
ProductSchema.virtual("reviews", {
  ref: "Reviews",
  localField: "_id",
  foreignField: "product",
  justOne: false,
});
ProductSchema.pre("deleteOne", async function (next) {
  const queryCondition = this.getQuery();
  const productId = queryCondition._id;
  await Reviews.deleteMany({ product: productId });
  console.log("associated reviews deleted");
  next();
});

module.exports = mongoose.model("Products", ProductSchema);

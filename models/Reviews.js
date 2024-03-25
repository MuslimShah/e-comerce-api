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

//* creating static method to calculate averege rating for a product

ReviewsSchema.statics.calculateAveregeRating = async function (productId) {
  /**
   * In the following piece of code i am using aggregate pipelining of mongodb
   * which is
   * -->$match
   * -->$group
   * -->$sort
   * to calculate averegeRating for a product and number of reviews */
  const result = await this.aggregate([
    { $match: { product: productId } },
    {
      $group: {
        _id: null,
        averegeRating: { $avg: "$rating" },
        numOfReviews: { $sum: 1 },
      },
    },
  ]);
  try {
    await this.model("Products").findOneAndUpdate(
      { _id: productId },
      {
        averegeRating: Math.ceil(result[0]?.averegeRating || 0),
        numOfReviews: result[0]?.numOfReviews || 0,
      }
    );
  } catch (error) {
    console.log(`something happened in calculateAveregeRating:${error}`);
  }
};

ReviewsSchema.post("save", async function () {
  await this.constructor.calculateAveregeRating(this.product);
  console.log(" review presave hook called -----");
});

/**

    TODO:
    - Like in post save hook i calculate averege rating
    - I also wanted to calculate it after deletion but as remove() method is deprecated
    -//! I am unable to get product id in post deleteOne hook there for i am calling 
    -//! calculateAveregeRating in review controller for cascade deletion and calculating averege rating  
    -*I need to figure out the way how to get productId in post deleteOne hook

*/

// ReviewsSchema.pre("deleteOne", async function (next) {
//   const reviewId = this.getQuery()._id; // Assuming the ID field is '_id'

//   // Find the review to be deleted
//   const reviewToDelete = await this.model.findOne({ _id: reviewId });
//   console.log(reviewToDelete);
//   await this.model.calculateAveregeRating(reviewToDelete.product);
//   next();
// });

module.exports = mongoose.model("Reviews", ReviewsSchema);

/*=============================================
=                   Import section                   =
=============================================*/
const statusCodes = require("http-status-codes");
const Reviews = require("../models/Reviews");
const Product = require("../models/Product");
const { notFound, BadRequest, unAuthorizedError } = require("../errors");
const checkPermissions = require("../utils/checkPermissions");

/*============  End of Import section  =============*/

/*=============================================
=                   Creatre Review                   =
=============================================*/
exports.createReview = async (req, res) => {
  //adding user to req.body
  req.body.user = req.user.userId;
  const { title, comment, rating, product: productId, user } = req.body;
  //*checking if the product is valid
  const isValidProduct = await Product.findOne({ _id: productId });
  if (!isValidProduct) {
    throw new notFound(`product not found with id:${productId}`);
  }

  //* checking if user already submitted review for the product
  const alreadySubmitted = await Reviews.findOne({
    user: user,
    product: productId,
  });
  if (alreadySubmitted) {
    throw new BadRequest(
      `already submitted review for the product :${productId}`
    );
  }
  //*creating review for the product
  const review = await Reviews.create({
    title,
    comment,
    rating,
    product: productId,
    user,
  });

  res.status(statusCodes.CREATED).json({ msg: "create review", review });
};

/*============  End of Creatre Review  =============*/

/*=============================================
=                   Get All Reviews                   =
=============================================*/

exports.getAllReviews = async (req, res) => {
  const page = req.query.page || 1;
  const limit = req.query.limit || 10;
  const reviews = await Reviews.find({})
    .skip((page - 1) * limit)
    .limit(limit);
  const totalReviews = await Reviews.countDocuments();
  const totalPages = Math.ceil(totalReviews / limit);

  res.status(statusCodes.OK).json({ count: totalReviews, totalPages, reviews });
};

/*============  End of Get All Reviews  =============*/

/*=============================================
=                   Get Single Review                   =
=============================================*/

exports.getSingleReview = async (req, res) => {
  const reviewId = req.params.id;
  //*finding review with given id  ---> if not found return not found
  const review = await Reviews.findOne({ _id: reviewId });
  if (!review) {
    throw new notFound(`No review found with id:${reviewId}`);
  }
  res.status(statusCodes.OK).json(review);
};

/*============  End of Get Single Review  =============*/

/*=============================================
=                   Update Review                   =
=============================================*/

exports.updateReview = async (req, res) => {
  const reviewId = req.params.id;
  const data = req.body;
  const updatedReview = await Reviews.findOneAndUpdate(
    { _id: reviewId },
    data,
    {
      new: true,
      runValidators: true,
    }
  );
  if (!updatedReview) {
    throw new notFound(`No review found with id:${reviewId}`);
  }
  res.status(statusCodes.OK).json(updatedReview);
};

/*============  End of Update Review  =============*/

/*=============================================
=                   Delete Review                   =
=============================================*/

exports.deleteReview = async (req, res) => {
  const reviewId = req.params.id;
  const review = await Reviews.findOne({ _id: reviewId });
  console.log(review);
  //* First checking if review exists
  if (!review) {
    throw new notFound(`No review found with id:${reviewId}`);
  }
  //*Checking if user has permissions to delete review --> user can only delete their own review
  checkPermissions(req.user, review.user);

  await Reviews.deleteOne({ _id: reviewId });

  res.status(statusCodes.OK).json({ msg: "Review Deleted" });
};

/*============  End of Delete Review  =============*/

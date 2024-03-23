/*=============================================
=                   Import section                   =
=============================================*/
const statusCodes = require("http-status-codes");
const Reviews = require("../models/Reviews");

/*============  End of Import section  =============*/

/*=============================================
=                   Creatre Review                   =
=============================================*/
exports.createReview = async (req, res) => {
  res.status(statusCodes.CREATED).json({ msg: "create review" });
};

/*============  End of Creatre Review  =============*/

/*=============================================
=                   Get All Reviews                   =
=============================================*/

exports.getAllReviews = async (req, res) => {
  res.status(statusCodes.OK).json({ msg: "get all reviews" });
};

/*============  End of Get All Reviews  =============*/

/*=============================================
=                   Get Single Review                   =
=============================================*/

exports.getSingleReview = async (req, res) => {
  res.status(statusCodes.OK).json({ msg: " get single review" });
};

/*============  End of Get Single Review  =============*/

/*=============================================
=                   Update Review                   =
=============================================*/

exports.updateReview = async (req, res) => {
  res.status(statusCodes.OK).json({ msg: "update review" });
};

/*============  End of Update Review  =============*/

/*=============================================
=                   Delete Review                   =
=============================================*/

exports.deleteReview = async (req, res) => {
  res.status(statusCodes.OK).json({ msg: "delete review" });
};

/*============  End of Delete Review  =============*/

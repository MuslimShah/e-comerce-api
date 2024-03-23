const {
  createReview,
  getAllReviews,
  getSingleReview,
  updateReview,
  deleteReview,
} = require("../contollers/reviewsController");
const express = require("express");
const { authenticateUser } = require("../middleware/authentication");
const router = express.Router();

/*=============================================
=                   Reviews Routes                   =
=============================================*/

router.get("/", getAllReviews);
router.get("/:id", getSingleReview);
router.post("/", authenticateUser, createReview);
router.patch("/:id", authenticateUser, updateReview);
router.delete("/:id", authenticateUser, deleteReview);

/*============  End of Reviews Routes  =============*/

module.exports = router;

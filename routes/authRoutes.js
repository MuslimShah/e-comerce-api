const {
  register,
  login,
  logOut,
  verifyEmail,
} = require("../contollers/authController");
const { authenticateUser } = require("../middleware/authentication");

const express = require("express");
const router = express.Router();
//auth routes
router.post("/register", register);
router.post("/verify-email", verifyEmail);
router.post("/login", login);

router.get("/logout", authenticateUser, logOut);

module.exports = router;

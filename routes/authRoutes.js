const {
  register,
  login,
  logOut,
  verifyEmail,
} = require("../contollers/authController");
const express = require("express");
const router = express.Router();
//auth routes
router.post("/register", register);
router.post("/verify-email", verifyEmail);
router.post("/login", login);

router.get("/logout", logOut);

module.exports = router;

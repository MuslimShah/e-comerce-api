const { register, login, logOut } = require("../contollers/authController");
const express = require("express");
const router = express.Router();
//auth routes
router.post("/register", register);
router.post("/login", login);
router.get("/logout", logOut);

module.exports = router;

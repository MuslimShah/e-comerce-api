const express = require("express");
const {
  getAllUsers,
  getSingleUser,
  showCurrentUser,
  updateUser,
  updateUserPassword,
} = require("../contollers/userController");
const {
  authenticateUser,
  authorizePermissions,
} = require("../middleware/authentication");
const router = express.Router();

//user routes
//Get Routes
//checking for authentication and authorization
router.get(
  "/",
  authenticateUser,
  authorizePermissions("admin", "owner"),
  getAllUsers
);
router.get("/showMe", authenticateUser, showCurrentUser);
router.get("/:id", authenticateUser, getSingleUser);

//Patch Routes--->For Updating
router.patch("/updateUser", authenticateUser, updateUser);
router.patch("/updateUserPassword", authenticateUser, updateUserPassword);

module.exports = router;

const express = require("express");
const router = express.Router();

const {
  createOrder,
  updateOrder,
  getAllOrders,
  getSingleOrder,
  getCurrentUserOrders,
} = require("../contollers/orderController");
const {
  authenticateUser,
  authorizePermissions,
} = require("../middleware/authentication");

//GET --> all orders of a single user
router.get("/showAllMyOrders", authenticateUser, getCurrentUserOrders);
//GET --> only admin can view all orders
router.get("/", authenticateUser, authorizePermissions("admin"), getAllOrders);
//POST --> create order
router.post("/", authenticateUser, createOrder);
//Get --> single order by id
router.get("/:id", authenticateUser, getSingleOrder);

//PATCH --> update order
router.patch("/:id", authenticateUser, updateOrder);

module.exports = router;

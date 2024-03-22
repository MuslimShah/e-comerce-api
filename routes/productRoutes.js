/*=============================================
=                   Imports                   =
=============================================*/
const {
  createProduct,
  getSingleProduct,
  getAllProducts,
  updateProduct,
  deleteProduct,
  uploadImage,
} = require("../contollers/productsController");
const {
  authenticateUser,
  authorizePermissions,
} = require("../middleware/authentication");
const express = require("express");
const router = express.Router();

/*============  End of Imports  =============*/

/*=============================================
=                   Product  Routes                   =
=============================================*/

router.post(
  "/uploadImage",
  authenticateUser,
  authorizePermissions("admin"),
  uploadImage
);

//Get routes
//Get ----> All products publically accessible
router.get("/", getAllProducts);

//Get ----> single product publically accessible
router.get("/:id", getSingleProduct);

//post routes

//POST ----> creating new product
router.post(
  "/",
  authenticateUser,
  authorizePermissions("admin"),
  createProduct
);

//patch routes---> for updating product details
router.patch(
  "/:id",
  authenticateUser,
  authorizePermissions("admin"),
  updateProduct
);

//delete route ---->for deleting product
router.delete(
  "/:id",
  authenticateUser,
  authorizePermissions("admin"),
  deleteProduct
);

/*============  End of Product  Routes  =============*/

module.exports = router;

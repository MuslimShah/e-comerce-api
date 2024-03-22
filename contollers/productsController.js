/*=============================================
=                   Imports Section                   =
=============================================*/
const statusCodes = require("http-status-codes");
const Product = require("../models/Product");
const { notFound } = require("../errors");

/*============  End of Imports Section  =============*/

/*=============================================
=                   Create Product                   =
=============================================*/

exports.createProduct = async (req, res) => {
  req.body.user = req.user.userId;
  const product = await Product.create(req.body);
  res.status(statusCodes.CREATED).json({ msg: "create product", product });
};

/*============  End of Create Product  =============*/

/*=============================================
=                   Get Single Product                   =
=============================================*/

exports.getSingleProduct = async (req, res) => {
  const productId = req.params.id;
  const product = await Product.find({ _id: productId });
  res.status(statusCodes.OK).json(product);
};

/*============  End of Get Single Product  =============*/

/*=============================================
=                   Get All Products                   =
=============================================*/

exports.getAllProducts = async (req, res) => {
  //getting all the products
  // *implenting pagination as well
  const page = req.query.page || 1;
  const limit = req.query.limit || 10;

  const products = await Product.find({})
    .skip((page - 1) * limit)
    .limit(limit);
  const totalProducts = await Product.countDocuments();
  const totalPages = Math.ceil(totalProducts / limit);

  res
    .status(statusCodes.OK)
    .json({ products: products, totalPages, totalProducts });
};

/*============  End of Get All Products  =============*/

/*=============================================
=                   Update Product                   =
=============================================*/

exports.updateProduct = (req, res) => {
  res.status(statusCodes.OK).json({ msg: "update product" });
};

/*============  End of Update Product  =============*/

/*=============================================
=                   Delete Product                   =
=============================================*/

exports.deleteProduct = async (req, res) => {
  const productId = req.params.id;
  const deletedProduct = await Product.findOneAndDelete({ _id: productId });
  if (!deletedProduct) {
    throw new notFound(`Product not found with id:${productId}`);
  }
  res.status(statusCodes.OK).json({ msg: "product Deleted", deletedProduct });
};

/*============  End of Delete Product  =============*/

/*=============================================
=                   Upload Product Image                   =
=============================================*/

exports.uploadImage = (req, res) => {
  res.status(statusCodes.OK).json({ msg: "image uploaded" });
};

/*============  End of Upload Product Image  =============*/

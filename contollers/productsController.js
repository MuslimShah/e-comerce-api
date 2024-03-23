/*=============================================
=                   Imports Section                   =
=============================================*/
const statusCodes = require("http-status-codes");
const Product = require("../models/Product");
const { notFound } = require("../errors");
const path = require("path");

/*============  End of Imports Section  =============*/

/*=============================================
=                   Create Product                   =
=============================================*/

exports.createProduct = async (req, res) => {
  req.body.user = req.user.userId;
  const product = await Product.create(req.body);
  res.status(statusCodes.CREATED).json({ msg: "Product Created", product });
};

/*============  End of Create Product  =============*/

/*=============================================
=                   Get Single Product                   =
=============================================*/

exports.getSingleProduct = async (req, res) => {
  //getting single product
  const productId = req.params.id;
  const product = await Product.find({ _id: productId }).populate("reviews");
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
    .populate("reviews")
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

exports.updateProduct = async (req, res) => {
  //*finding product by id and updating it
  const productId = req.params.id;
  const data = req.body;
  const newProduct = await Product.findOneAndUpdate({ _id: productId }, data, {
    new: true,
    runValidators: true,
  });
  if (!newProduct) {
    throw new notFound(`Product not found with id:${productId}`);
  }
  res.status(statusCodes.OK).json({ msg: "product updated", newProduct });
};

/*============  End of Update Product  =============*/

/*=============================================
=                   Delete Product                   =
=============================================*/

exports.deleteProduct = async (req, res) => {
  const productId = req.params.id;
  const product = await Product.findOne({ _id: productId });
  if (!product) {
    throw new notFound(`Product not found with id:${productId}`);
  }
  await Product.deleteOne({ _id: productId });
  res.status(statusCodes.OK).json({ msg: "product Deleted" });
};

/*============  End of Delete Product  =============*/

/*=============================================
=                   Upload Product Image                   =
=============================================*/

exports.uploadImage = async (req, res) => {
  let productImage;
  console.log(req.files);
  if (!req.files || Object.keys(req.files).length === 0) {
    return res.status(400).send("No files were uploaded.");
  }
  productImage = req.files.image;
  if (!productImage.mimetype.startsWith("image")) {
    throw new BadRequest("Please upload image only");
  }
  //check for the size
  const maxSize = 1024 * 1024; //1Mb
  if (productImage.size > maxSize) {
    throw new BadRequest("Please uplad image less than 1MB");
  }

  const imagePath = path.join(
    __dirname,
    "../public/uploads/" + `${productImage.name}`
  );

  await productImage.mv(imagePath);
  res
    .status(statusCodes.OK)
    .json({ msg: "image uploaded", src: `/uploads/${productImage.name}` });
};

/*============  End of Upload Product Image  =============*/

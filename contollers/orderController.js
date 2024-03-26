/*=============================================
=                   Import Section                   =
=============================================*/

const statusCodes = require("http-status-codes");
const Product = require("../models/Product");
const Order = require("../models/Order");
const { notFound, BadRequest } = require("../errors");
const checkPermissions = require("../utils/checkPermissions");
const bcrypt = require("bcryptjs");

/*============  End of Import Section  =============*/

const fakeStripeApi = async function ({ amount, currency }) {
  const randomNums = (Math.random() * 10000).toString();
  const client_secret = await bcrypt.hash(randomNums, 10);
  return { client_secret, amount };
};

/*=============================================
=                   Get All Orders -->Admin only                   =
=============================================*/

exports.getAllOrders = async (req, res) => {
  res.status(statusCodes.OK).json({ msg: "getAllOrders" });
};

/*============  End of Get All Orders -->Admin only  =============*/

/*=============================================
=                   Create Order                   =
=============================================*/

exports.createOrder = async (req, res) => {
  const { items: cartItems, tax, shippingFee } = req.body;
  //*first making sure if there are items in cart
  if (!cartItems || cartItems.length < 1) {
    throw new BadRequest("No cart items provided");
  }
  if (!tax || !shippingFee) {
    throw new BadRequest("Please provide tax and shipping fee");
  }
  let orderItems = [];
  let subTotal = 0;

  //finding orderItems in db for cross check

  for (const item of cartItems) {
    const dbProduct = await Product.findOne({ _id: item.product });
    if (!dbProduct) {
      throw new notFound(
        `No product found with name:${item.name}, id :${item.product}`
      );
    }
    const { name, price, image, _id } = dbProduct;
    //create single order item
    const singleOrgerItem = {
      amount: item.amount,
      name,
      price,
      image,
      product: _id,
    };
    orderItems = [...orderItems, singleOrgerItem];
    //calculating subtotal
    subTotal += item.amount * price;
  }
  const total = tax + subTotal + shippingFee;
  console.log("total:", total);

  const paymentIntent = await fakeStripeApi({
    amount: total,
    currency: "pkr",
  });
  //assume payment is successful
  //*create order
  const order = await Order.create({
    tax,
    shippingFee,
    subTotal,
    total,
    orderItems,
    clientSecret: paymentIntent.client_secret,
    user: req.user.userId,
  });

  res
    .status(statusCodes.CREATED)
    .json({ msg: "createOrder", order, clientSecret: order.clientSecret });
};

/*============  End of Create Order  =============*/

/*=============================================
=                   Get Single Order                   =
=============================================*/

exports.getSingleOrder = async (req, res) => {
  const orderId = req.params.id;
  //* finding order
  const order = await Order.find({ _id: orderId });
  checkPermissions(req.user, order.user);
  res.status(statusCodes.OK).json(order);
};

/*============  End of Get Single Order  =============*/

/*=============================================
=                   Get Current User Orders                   =
=============================================*/

exports.getCurrentUserOrders = async (req, res) => {
  res.status(statusCodes.OK).json({ msg: "getCurrentUserOrders" });
};

/*============  End of Get Current User Orders  =============*/

/*=============================================
=                   Update Order                   =
=============================================*/

exports.updateOrder = async (req, res) => {
  res.status(statusCodes.OK).json({ msg: "updateOrder" });
};

/*============  End of Update Order  =============*/

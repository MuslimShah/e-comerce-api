const statusCodes = require("http-status-codes");

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
  res.status(statusCodes.CREATED).json({ msg: "createOrder" });
};

/*============  End of Create Order  =============*/

/*=============================================
=                   Get Single Order                   =
=============================================*/

exports.getSingleOrder = async (req, res) => {
  res.status(statusCodes.OK).json({ msg: "getSingleOrder" });
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

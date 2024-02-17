/*=============================================
=                   Imports                   =
=============================================*/
const statusCode = require("http-status-codes");
const User = require("../models/user");
const { BadRequest, unAuthenticatedError, notFound } = require("../errors");
const { attachCookieToResponse, createTokenUser } = require("../utils");
const bcrypt = require("bcryptjs");
/*============  End of Imports  =============*/



/*=============================================
=                   Get Single User                   =
=============================================*/

exports.getSingleUser = async (req, res) => {
  //get id from params
  const { id: userId } = req.params;
  const singleUser = await User.findOne(
    { _id: userId, role: "user" },
    { password: 0 }
  );
  if (!singleUser) {
    throw new notFound(`no user found with this ${userId} Id`);
  }
  res.status(statusCode.OK).json({ singleUser });
};

/*============  End of Get Single User  =============*/




/*=============================================
=                   Get All Users                   =
=============================================*/
exports.getAllUsers = async (req, res) => {
  //find all users
  const users = await User.find({ role: "user" }, { password: 0 });
  if (users.length == 0) {
    throw new notFound("No users found");
  }
  res.status(statusCode.OK).json({ msg: "all users", users });
};

/*============  End of Get All Users  =============*/




/*=============================================
=                   Show Current User                   =
=============================================*/
exports.showCurrentUser = (req, res) => {
  //show current login user
  const user = req.user;
  res.status(statusCode.OK).json({ user });
};

/*============  End of Show Current User  =============*/




/*=============================================
=                   Update User                   =
=============================================*/

exports.updateUser = async (req, res) => {
  const { email, name } = req.body;
  // if(!email || !name){
  //   throw new BadRequest('Provide correct values');
  // }
  const updatedUser = await User.findOneAndUpdate(
    { _id: req.user.userId },
    { email, name },
    { new: true, runValidators: true, projection: { password: 0 } }
  );
  //send back the updated cookie and token
  const tokenUser = createTokenUser(updatedUser);
  attachCookieToResponse(res, tokenUser);

  res.status(statusCode.OK).json({ msg: "update user", tokenUser });
};

/*============  End of Update User  =============*/




/*=============================================
=                   Update User Password                   =
=============================================*/

exports.updateUserPassword = async (req, res) => {
  //ask user to enter old password
  const { oldPassword, newPassword } = req.body;
  if (!oldPassword || !newPassword) {
    throw new BadRequest("Please provide old password and new password");
  }
  //first fetch entire user
  const user = await User.findOne({ _id: req.user.userId });
  //compare old password with save one
  const isMatched = await user.comparePassword(oldPassword);
  if (!isMatched) {
    throw new unAuthenticatedError("Invalid Credintials");
  }
  user.password = newPassword;
  user.save();
  res.status(statusCode.OK).json({ msg: "password updated successfully" });
};

/*============  End of Update User Password  =============*/

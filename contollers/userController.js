const statusCode = require("http-status-codes");
const User = require("../models/user");
const ObjectId = require("mongodb").ObjectId;
const { BadRequest, unAuthenticatedError, notFound } = require("../errors");
const { attachCookieToResponse,createTokenUser } = require("../utils");
const bcrypt = require("bcryptjs");

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

exports.getAllUsers = async (req, res) => {
  //find all users
  const users = await User.find({ role: "user" }, { password: 0 });
  if (users.length == 0) {
    throw new notFound("No users found");
  }
  res.status(statusCode.OK).json({ msg: "all users", users });
};
//--------------- SHOW CURRENT USER --------------------------
exports.showCurrentUser = (req, res) => {
  //show current login user
  const user = req.user;
  res.status(statusCode.OK).json({ user });
};

//----------- updating user info -----------------------------
exports.updateUser = async (req, res) => {
  const { email, name } = req.body;
  // if(!email || !name){
  //   throw new BadRequest('Provide correct values');
  // }
  const updateUser = await User.findOneAndUpdate(
    { _id: req.user.userId },
    { email, name },
    { new: true, runValidators: true, projection: { password: 0 } }
  );

  res.status(statusCode.OK).json({ msg: "update user", updateUser });
};

//----------------- Update password middleware -------------
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
  const tokenUser=createTokenUser(user);
  attachCookieToResponse(res,tokenUser);
  res.status(statusCode.OK).json({ msg: "password updated successfully" });
};

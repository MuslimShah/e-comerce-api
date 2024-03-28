/*=============================================
=                   Imports                   =
=============================================*/
const User = require("../models/user");
const {
  BadRequest,
  CustomAPIError,
  unAuthenticatedError,
} = require("../errors");
const statusCode = require("http-status-codes");
const { attachCookieToResponse, createTokenUser } = require("../utils");
const crypto = require("crypto");
const sendEmail = require("../utils/sendEmail");

/*============  End of Imports  =============*/

/*=============================================
=                   Register User                   =
=============================================*/
exports.register = async (req, res) => {
  let { name, email, password, role } = req.body;
  //checking for existing user
  const exUser = await User.findOne({ email });
  if (exUser) {
    //if user already exist throw error with message
    throw new BadRequest("User Already exists with this email");
  }
  const isFirstAccount = (await User.countDocuments({})) === 0;
  //first user will be an admin
  role = isFirstAccount ? "admin" : "user";
  const verificationToken = crypto.randomBytes(40).toString("hex");
  // add new user
  const user = await User.create({
    name,
    email,
    password,
    role,
    verificationToken,
  });
  //* Sending email to user using mailerSend
  await sendEmail(user);
  res
    .status(statusCode.CREATED)
    .json({ msg: "Your account is registered .Please verify email" });
};

/*============  End of Register User  =============*/

/*=============================================
=                   Verify Email                   =
=============================================*/

exports.verifyEmail = async (req, res) => {
  const { verificationToken, email } = req.body;
  const user = await User.findOneAndUpdate(
    { email, verificationToken },
    { $set: { isVerified: true, verificationToken: "" } },
    {
      new: true,
    }
  );
  if (!user) {
    throw new unAuthenticatedError(
      "user not found with given email or incorrect token send"
    );
  }

  res.status(statusCode.OK).json({ msg: "email verified" });
};

/*============  End of Verify Email  =============*/

/*=============================================
=                   Login User                   =
=============================================*/

exports.login = async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    throw new BadRequest("Invalid credintials");
  }
  //find user with given email
  const user = await User.findOne({ email });
  if (!user) {
    throw new unAuthenticatedError("user not found with given email");
  }

  //comparing password with --->one stored in db
  const isMatched = await user.comparePassword(password);
  if (!isMatched) {
    throw new unAuthenticatedError("Incorrect Password");
  }
  if (!user.isVerified) {
    throw new unAuthenticatedError("please verify email");
  }
  //payload for token creation
  const tokenUser = createTokenUser(user);
  //create token and attach it to cookie
  attachCookieToResponse(res, tokenUser);
  res
    .status(statusCode.OK)
    .json({ userId: user._id, name: user.name, role: user.role });
};

/*============  End of Login User  =============*/

/*=============================================
=                   LogOut User                   =
=============================================*/

exports.logOut = (req, res) => {
  res.cookie("token", "logout", {
    expires: new Date(Date.now()),
  });
  res.status(statusCode.OK).json({ msg: "logged out" });
};

/*============  End of LogOut User  =============*/

/*=============================================
=                   Imports                   =
=============================================*/
const User = require("../models/user");
const Token = require("../models/Token");
const {
  BadRequest,
  CustomAPIError,
  unAuthenticatedError,
} = require("../errors");
const statusCode = require("http-status-codes");
const { attachCookieToResponse, createTokenUser } = require("../utils");
const crypto = require("crypto");
const sendVerificationEmail = require("../utils/sendVerificationEmail");
const sendPasswordResetEmail = require("../utils/sendPasswordResetEmail");
const createHash = require("../utils/createHash");

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
  try {
    await sendVerificationEmail({
      name: user.name,
      email: user.email,
      verificationToken: user.verificationToken,
      origin: process.env.ORIGIN,
    });
  } catch (error) {
    await User.deleteOne({ email: email });
    throw new CustomAPIError("Unable to register try again", 500);
  }
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

  //create token user
  const tokenUser = createTokenUser({ user });
  let refreshToken = "";
  //checking for existing token
  const existingToken = await Token.findOne({ user: user._id });
  if (existingToken) {
    const { isValid } = existingToken;
    if (!isValid) {
      throw new unAuthenticatedError("Invalid Credintials");
    }
    refreshToken = existingToken.refreshToken;
    //create token and attach it to cookie
    attachCookieToResponse({ res, user: tokenUser, refreshToken });
    return res.status(statusCode.OK).json({ tokenUser });
  }

  //cif not token found --->create new token
  refreshToken = crypto.randomBytes(40).toString("hex");
  const userAgent = req.headers["user-agent"];
  const ip = req.ip;
  const userToken = { refreshToken, userAgent, ip, user: user._id };
  await Token.create(userToken);

  //create token and attach it to cookie
  attachCookieToResponse({ res, tokenUser, refreshToken });
  res.status(statusCode.OK).json({ tokenUser });
};

/*============  End of Login User  =============*/

/*=============================================
=                   LogOut User                   =
=============================================*/

exports.logOut = async (req, res) => {
  //remove refresh token of user from db
  await Token.findOneAndDelete({ user: req.user.userId });
  res.cookie("accessToken", "logout", {
    expires: new Date(Date.now()),
  });
  res.cookie("refreshToken", "logout", {
    expires: new Date(Date.now()),
  });
  res.status(statusCode.OK).json({ msg: "logged out" });
};

/*============  End of LogOut User  =============*/

/*=============================================
=                   Forgot Passord                   =
=============================================*/

exports.forgotPassord = async (req, res) => {
  const { email } = req.body;
  if (!email) {
    throw new BadRequest("Please provide valid email");
  }
  const passwordToken = crypto.randomBytes(40).toString("hex");
  const tenMinutes = 1000 * 60 * 10;
  const passwordTokenExpDate = new Date(Date.now() + tenMinutes);
  const user = await User.findOneAndUpdate(
    { email: email, isVerified: true },
    {
      $set: {
        passwordToken: createHash(passwordToken),
        passwordTokenExpDate: passwordTokenExpDate,
      },
    },
    { new: true }
  );
  if (!user) {
    throw new unAuthenticatedError(`User not found with email:${email}`);
  }
  try {
    await sendPasswordResetEmail({
      name: user.name,
      email: user.email,
      passwordToken: passwordToken,
      origin: process.env.ORIGIN,
    });
  } catch (error) {
    throw new CustomAPIError("Unable to reset password try again");
  }
  res.status(statusCode.OK).json({ msg: "check email to reset password" });
};

/*============  End of Forgot Passord  =============*/

/*=============================================
=                   Reset Passord                   =
=============================================*/

exports.resetPassword = async (req, res) => {
  const { token, email, password } = req.body;
  if (!token || !email || !password) {
    throw new BadRequest("please provide all values");
  }
  const user = await User.findOne({ email });

  if (user) {
    const currentDate = new Date();
    if (
      user.passwordToken === createHash(token) &&
      user.passwordTokenExpDate > currentDate
    ) {
      user.password = password;
      user.passwordToken = null;
      user.passwordTokenExpDate = null;
      await user.save();
    }
  }
  res.status(statusCode.OK).json({ msg: "reset passwrod" });
};

/*============  End of Reset Passord  =============*/

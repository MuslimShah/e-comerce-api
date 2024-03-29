const jwt = require("jsonwebtoken");
const { unAuthenticatedError, unAuthorizedError } = require("../errors");
const User = require("../models/user");
const Token = require("../models/Token");
const { isTokenValid } = require("../utils");
const { attachCookieToResponse } = require("../utils/jwt");

//authenticaton for users --->role 'user'
const authenticateUser = async (req, res, next) => {
  const { accessToken, refreshToken } = req.signedCookies;

  try {
    if (accessToken) {
      const payload = isTokenValid(accessToken);
      req.user = payload.user;
      return next();
    }
    //now checking for refresh token
    const payload = isTokenValid(refreshToken);
    console.log(payload);
    const existingToken = await Token.findOne({
      user: payload.user.userId,
      refreshToken: payload.refreshToken,
    });
    console.log(existingToken);
    if (!existingToken || !existingToken?.isValid) {
      throw new unAuthenticatedError("Authentication is Invalid");
    }
    req.user = payload.user;
    attachCookieToResponse({
      res,
      user: payload.user,
      refreshToken: existingToken.refreshToken,
    });
    next();
  } catch (error) {
    throw new unAuthenticatedError("Authentication is Invalid");
  }
};

//authorize permission for admin
const authorizePermissions = (...roles) => {
  // if(req.user.role !=='admin'){
  //     throw new unAuthorizedError('Unauthorized Error')
  // }
  // next()
  //authorize user to the route if allowed
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      throw new unAuthorizedError("Unauthorized Error");
    }

    next();
  };
};
module.exports = { authenticateUser, authorizePermissions };

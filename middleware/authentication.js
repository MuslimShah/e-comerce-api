const jwt = require("jsonwebtoken");
const { unAuthenticatedError, unAuthorizedError } = require("../errors");
const User = require("../models/user");
const { isTokenValid } = require("../utils");

//authenticaton for users --->role 'user'
const authenticateUser = (req, res, next) => {
  const token = req.signedCookies.token;
  if (!token) {
    throw new unAuthenticatedError("Authentication is Invalid");
  }
  try {
    const { name, userId, role } = isTokenValid(token);
    req.user = { name, userId, role };
  } catch (error) {
    throw new unAuthenticatedError("Authentication is Invalid");
  }

  next();
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

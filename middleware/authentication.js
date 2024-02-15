const jwt = require("jsonwebtoken");
const { unAuthenticatedError } = require("../errors");
const User = require("../models/user");
const { isTokenValid } = require("../utils/jwt");

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

module.exports = authenticateUser;

const jwt = require("jsonwebtoken");
//creating token
exports.createJwt = ({ payload }) => {
  const secretKey = process.env.JWT_SECRET;
  //not using expiresIn becuase already used in cookie
  const lifeTime = process.env.JWT_EXPIRE;
  const token = jwt.sign(payload, secretKey);
  return token;
};

//verify token
exports.isTokenValid = (token) => jwt.verify(token, process.env.JWT_SECRET);

//create token and then attatch token to cookie
exports.attachCookieToResponse = ({ res, user, refreshToken }) => {
  //create token
  const accesTokenJwt = this.createJwt({ payload: { user } });
  const refreshTokenJwt = this.createJwt({ payload: { user, refreshToken } });
  //attach token to cookie
  const thirtyDays = 1000 * 60 * 60 * 24 * 30;
  const fifteenMinutes = 1000 * 60 * 15;
  res.cookie("accessToken", accesTokenJwt, {
    httpOnly: true,
    secure: process.env.NODE_ENV == "production",
    signed: true,
    expires: new Date(Date.now() + fifteenMinutes),
  });
  res.cookie("refreshToken", refreshTokenJwt, {
    httpOnly: true,
    secure: process.env.NODE_ENV == "production",
    signed: true,
    expires: new Date(Date.now() + thirtyDays),
  });
};

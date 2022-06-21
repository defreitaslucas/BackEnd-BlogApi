require('dotenv').config();
const jwt = require('jsonwebtoken');

const TOKEN_SECRET = process.env.JWT_SECRET;

const tokenAuthenticated = async (req, res, next) => {
  const token = req.headers.authorization;
  if (!token) {
    return { status: 401, message: 'Token not found' };
  }
  const validate = await jwt.verify(token, TOKEN_SECRET);
  if (!validate) {
    return { status: 401, message: 'jwt malformed' };
  }
  res.locals.user = validate;
  console.log(res.locals.user);
  next();
};

module.exports = tokenAuthenticated;
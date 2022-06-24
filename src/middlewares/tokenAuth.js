require('dotenv').config();
const jwt = require('jsonwebtoken');

const TOKEN_SECRET = process.env.JWT_SECRET;

const tokenAuthenticated = async (req, res, next) => {
  try {
    const token = req.headers.authorization;
    if (!token) throw Object.assign(new Error('Token not found'), { status: 401 });
    const validate = await jwt.verify(token, TOKEN_SECRET);
    req.user = validate;
    next();
  } catch (error) {
    if (error.message === 'jwt malformed') {
      return res.status(401).json({ message: 'Expired or invalid token' });
    }
    return res.status(401).json({ message: error.message });
  }
};

module.exports = tokenAuthenticated;
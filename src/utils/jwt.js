const jwt = require('jsonwebtoken');
require('dotenv').config();

const TOKEN_SECRET = process.env.JWT_SECRET;

const jwtConfig = {
  expiresIn: '15m',
  algorithm: 'HS256',
};

const generateJWTToken = ({ id, displayName, email, image }) => jwt
.sign({ id, displayName, email, image }, TOKEN_SECRET, jwtConfig);

module.exports = {
  generateJWTToken,
};